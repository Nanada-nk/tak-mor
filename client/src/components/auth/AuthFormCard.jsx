import { Link } from "react-router"
import { BubblesIcon } from 'lucide-react'
import AuthLayout from "./AuthLayout";

function AuthFormCard({ title, subtitle, children, onSubmit, isSubmitting, buttonText, bottomLinkPath, bottomLinkText, bottomText }) {

  const renderTitle = () => {
    if (Array.isArray(title)) {
      return title.map((line, index) => (
        <h1 key={index} className="text-3xl md:text-4xl font-bold font-serif text-pri-gr1">
          {line}
        </h1>
      ));
    }
    return <h1 className="text-3xl md:text-4xl font-bold font-serif text-pri-gr1">{title}</h1>;
  }

  return (
    
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        {renderTitle()}
        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="bg-bg-cr4 p-8 rounded-3xl shadow-lg space-y-4">
        {children}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <BubblesIcon className="w-5 h-5 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : (
            <p>{buttonText}</p>
          )}
        </button>
      </form>

      {bottomLinkPath && (
        <p className="text-center text-sm text-gray-600">
          {bottomText}{" "}
          <Link to={bottomLinkPath} className="font-bold text-pri-gr1 hover:underline">
            {bottomLinkText}
          </Link>
        </p>
      )}
    </div>

  )
}

export default AuthFormCard