
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';

function ImageCropper({ 
  src, 
  onCropComplete, 
  aspectRatio = 1, 
  cropShape = 'round',
  showGrid = false,
  initialCrop = { x: 0, y: 0 },
  initialZoom = 1,
  minZoom = 1,
  maxZoom = 5,
  showPreview = true,
  enableResize = true,
  className = ''
}) {
  // Core cropping state
  const [crop, setCrop] = useState(initialCrop);
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Crop area state for window-style resizing
  const [cropArea, setCropArea] = useState({
    width: 200,
    height: 200,
    x: 100,
    y: 100
  });
  
  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragHandle, setDragHandle] = useState(null);
  const [showControls, setShowControls] = useState(true);
  
  // Preview state
  const [previewImage, setPreviewImage] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Handle crop completion
  const generatePreview = useCallback(async (cropData) => {
    if (!src || !cropData || !canvasRef.current) return;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      
      image.onload = () => {
        const size = Math.min(cropData.width, cropData.height);
        canvas.width = size;
        canvas.height = size;
        
        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        if (cropShape === 'round') {
          // Create circular clipping path
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.clip();
        }
        
        // Draw cropped image
        ctx.drawImage(
          image,
          cropData.x,
          cropData.y,
          cropData.width,
          cropData.height,
          0,
          0,
          size,
          size
        );
        
        // Convert to blob URL
        canvas.toBlob((blob) => {
          if (previewImage) {
            URL.revokeObjectURL(previewImage);
          }
          const url = URL.createObjectURL(blob);
          setPreviewImage(url);
        }, 'image/jpeg', 0.9);
      };
      
      image.src = src;
    } catch (error) {
      console.error('Preview generation failed:', error);
    }
  }, [src, cropShape, previewImage]);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    if (onCropComplete) {
      onCropComplete(croppedArea, croppedAreaPixels);
    }
    generatePreview(croppedAreaPixels);
  }, [onCropComplete, generatePreview]);
  
  // Resize handles for window-style interaction
  const handleMouseDown = useCallback((e, handle) => {
    if (!enableResize) return;
    
    e.preventDefault();
    setIsResizing(true);
    setDragHandle(handle);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startCropArea = { ...cropArea };
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newCropArea = { ...startCropArea };
      
      switch (handle) {
        case 'nw':
          newCropArea.x = startCropArea.x + deltaX;
          newCropArea.y = startCropArea.y + deltaY;
          newCropArea.width = startCropArea.width - deltaX;
          newCropArea.height = startCropArea.height - deltaY;
          break;
        case 'n':
          newCropArea.y = startCropArea.y + deltaY;
          newCropArea.height = startCropArea.height - deltaY;
          break;
        case 'ne':
          newCropArea.y = startCropArea.y + deltaY;
          newCropArea.width = startCropArea.width + deltaX;
          newCropArea.height = startCropArea.height - deltaY;
          break;
        case 'e':
          newCropArea.width = startCropArea.width + deltaX;
          break;
        case 'se':
          newCropArea.width = startCropArea.width + deltaX;
          newCropArea.height = startCropArea.height + deltaY;
          break;
        case 's':
          newCropArea.height = startCropArea.height + deltaY;
          break;
        case 'sw':
          newCropArea.x = startCropArea.x + deltaX;
          newCropArea.width = startCropArea.width - deltaX;
          newCropArea.height = startCropArea.height + deltaY;
          break;
        case 'w':
          newCropArea.x = startCropArea.x + deltaX;
          newCropArea.width = startCropArea.width - deltaX;
          break;
      }
      
      // Maintain minimum size
      if (newCropArea.width < 50) newCropArea.width = 50;
      if (newCropArea.height < 50) newCropArea.height = 50;
      
      // Maintain aspect ratio for circular crops
      if (cropShape === 'round') {
        const size = Math.min(newCropArea.width, newCropArea.height);
        newCropArea.width = size;
        newCropArea.height = size;
      }
      
      setCropArea(newCropArea);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      setDragHandle(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [enableResize, cropArea, cropShape]);
  
  // Touch support for mobile devices
  const handleTouchStart = useCallback((e, handle) => {
    if (!enableResize || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    
    handleMouseDown(mouseEvent, handle);
  }, [handleMouseDown, enableResize]);
  
  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);
  
  // Reset controls visibility timer
  useEffect(() => {
    let timer;
    if (isDragging || isResizing) {
      setShowControls(true);
    } else {
      timer = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isDragging, isResizing]);
  
  return (
    <div className={`flex flex-col ${showPreview ? 'lg:flex-row' : ''} gap-6 p-4 bg-white rounded-lg shadow-lg ${className}`}>
      {/* Main Cropper Area */}
      <div className="flex-1 min-h-0">
        <div 
          ref={containerRef}
          className="relative w-full bg-gray-100 rounded-lg overflow-hidden"
          style={{ height: showPreview ? '350px' : '380px' }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => !isDragging && !isResizing && setShowControls(false)}
        >
          {src ? (
            <>
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                cropShape={cropShape}
                showGrid={showGrid}
                minZoom={minZoom}
                maxZoom={maxZoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteCallback}
                onInteractionStart={() => setIsDragging(true)}
                onInteractionEnd={() => setIsDragging(false)}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f3f4f6'
                  },
                  mediaStyle: {
                    maxHeight: '100%',
                    maxWidth: '100%'
                  }
                }}
              />
              
              {/* Resize Handles for Window-style Interaction */}
              {enableResize && showControls && (
                <>
                  {/* Corner handles */}
                  <div
                    className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize hover:bg-blue-600 transition-colors"
                    style={{ top: '10px', left: '10px' }}
                    onMouseDown={(e) => handleMouseDown(e, 'nw')}
                    onTouchStart={(e) => handleTouchStart(e, 'nw')}
                  />
                  <div
                    className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize hover:bg-blue-600 transition-colors"
                    style={{ top: '10px', right: '10px' }}
                    onMouseDown={(e) => handleMouseDown(e, 'ne')}
                    onTouchStart={(e) => handleTouchStart(e, 'ne')}
                  />
                  <div
                    className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize hover:bg-blue-600 transition-colors"
                    style={{ bottom: '10px', right: '10px' }}
                    onMouseDown={(e) => handleMouseDown(e, 'se')}
                    onTouchStart={(e) => handleTouchStart(e, 'se')}
                  />
                  <div
                    className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize hover:bg-blue-600 transition-colors"
                    style={{ bottom: '10px', left: '10px' }}
                    onMouseDown={(e) => handleMouseDown(e, 'sw')}
                    onTouchStart={(e) => handleTouchStart(e, 'sw')}
                  />
                  
                  {/* Edge handles */}
                  <div
                    className="absolute w-3 h-6 bg-blue-500 border border-white rounded-sm cursor-n-resize hover:bg-blue-600 transition-colors"
                    style={{ top: '10px', left: '50%', transform: 'translateX(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'n')}
                    onTouchStart={(e) => handleTouchStart(e, 'n')}
                  />
                  <div
                    className="absolute w-6 h-3 bg-blue-500 border border-white rounded-sm cursor-e-resize hover:bg-blue-600 transition-colors"
                    style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'e')}
                    onTouchStart={(e) => handleTouchStart(e, 'e')}
                  />
                  <div
                    className="absolute w-3 h-6 bg-blue-500 border border-white rounded-sm cursor-s-resize hover:bg-blue-600 transition-colors"
                    style={{ bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 's')}
                    onTouchStart={(e) => handleTouchStart(e, 's')}
                  />
                  <div
                    className="absolute w-6 h-3 bg-blue-500 border border-white rounded-sm cursor-w-resize hover:bg-blue-600 transition-colors"
                    style={{ top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                    onMouseDown={(e) => handleMouseDown(e, 'w')}
                    onTouchStart={(e) => handleTouchStart(e, 'w')}
                  />
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>No image selected</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Zoom Controls */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 w-16">Zoom:</label>
            <input
              type="range"
              min={minZoom}
              max={maxZoom}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600 w-12">{zoom.toFixed(1)}x</span>
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      {showPreview && (
        <div className="lg:w-80 w-full">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Preview</h3>
            <p className="text-sm text-gray-600">Real-time preview of cropped image</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Large Preview */}
              <div className="relative">
                <div className={`w-40 h-40 bg-gray-200 border-2 border-gray-300 flex items-center justify-center ${cropShape === 'round' ? 'rounded-full' : 'rounded-lg'} overflow-hidden`}>
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Preview</span>
                  )}
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Large
                </div>
              </div>
              
              {/* Medium Preview */}
              <div className="relative">
                <div className={`w-20 h-20 bg-gray-200 border border-gray-300 flex items-center justify-center ${cropShape === 'round' ? 'rounded-full' : 'rounded'} overflow-hidden`}>
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">Medium</span>
                  )}
                </div>
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full">
                  Med
                </div>
              </div>
              
              {/* Small Preview */}
              <div className="relative">
                <div className={`w-10 h-10 bg-gray-200 border border-gray-300 flex items-center justify-center ${cropShape === 'round' ? 'rounded-full' : 'rounded'} overflow-hidden`}>
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">S</span>
                  )}
                </div>
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded-full" style={{ fontSize: '8px' }}>
                  S
                </div>
              </div>
            </div>
            
            {/* Preview Info */}
            {croppedAreaPixels && (
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <div>Size: {Math.round(croppedAreaPixels.width)} × {Math.round(croppedAreaPixels.height)}px</div>
                <div>Position: ({Math.round(croppedAreaPixels.x)}, {Math.round(croppedAreaPixels.y)})</div>
                <div>Zoom: {zoom.toFixed(1)}x</div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden canvas for preview generation */}
      <canvas 
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageCropper;