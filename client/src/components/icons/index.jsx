export function DropdownIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5z"
        fill="white"
      />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg
      className="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
  );
}


export function SignUpIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 18h-6m3-3v6M4 21a7 7 0 019-6.71M15 7a4 4 0 11-8 0 4 4 0 018 0z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LoginIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <path d="M12 14v4M6 10V8c0-.34.028-.675.083-1M18 10V8A6 6 0 007.5 4.031" />
        <path d="M11 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22h-1" />
      </g>
    </svg>
  )
}

export function PinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" d="M0 0H24V24H0z" />
      <path
        d="M18 9c0 4.746-3.754 9.492-5.323 11.269a.892.892 0 01-1.354 0C9.755 18.492 6 13.746 6 9c0-2 1.5-6 6-6s6 4 6 6z"
        stroke="#000"
        strokeLinejoin="round"
      />
      <circle cx={12} cy={9} r={2} stroke="#000" strokeLinejoin="round" />
    </svg>
  )
}

export function StarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
      strokeWidth={0.00024000000000000003}
      {...props}
    >
      <path
        d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45.28-.213.46-.536.82-1.182l.328-.588z"
        fill="#fff"
      />
    </svg>
  )
}

export function ClinicIcon(props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.263 5a6.632 6.632 0 00-5.993 3.79H6v1.894l3.79 1.895V37.21H6V41h19.895V23h8.526v18H42v-3.79h-3.79V12.58L42 10.684V8.79H25.257A6.632 6.632 0 0019.263 5zm-1.292 2.842h2.584v3.445H24v2.584h-3.445v3.445h-2.584V13.87h-3.445v-2.584h3.445V7.842zM14.526 23h6.632v6.632h-6.632V23z"
        fill="#333"
      />
    </svg>
  )
}

export function VideoCallIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#000">
        <path d="M10 3H0v10h10V3zM15 3l-3 3v4l3 3h1V3h-1z" />
      </g>
    </svg>
  )
}

export function AudioCallIcon(props) {
  return (
    <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M61.73 7173.996c-.463 1.407-2.277 2.109-3.573 1.992-1.77-.16-3.696-1.099-5.158-2.133-2.149-1.52-4.162-3.871-5.335-6.366-.829-1.763-1.015-3.931.218-5.538.456-.594.95-.911 1.69-.948 1.028-.05 1.172.538 1.525 1.454.263.685.614 1.384.81 2.094.367 1.325-.916 1.38-1.078 2.463-.1.683.727 1.599 1.101 2.086a10.105 10.105 0 002.608 2.403c.57.359 1.488 1.006 2.14.649 1.004-.55.91-2.243 2.313-1.67.727.296 1.431.723 2.125 1.097 1.073.577 1.023 1.175.614 2.417-.306.928.306-.928 0 0"
        transform="translate(-103 -7321) translate(56 160)"
        fill="#000"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </svg>
  )
}

export function ChatIcon(props) {
  return (
    <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1242.353 451.753v1016.471H757.496l-418.672 418.673v-418.673H0V451.754h1242.353zM1920.033.033v1016.471h-225.881v419.012l-338.937-338.936V338.857H677.681V.034h1242.353zM677.76 1016.46H338.824v112.94H677.76v-112.94zm225.77-225.882H338.823V903.63h564.705V790.577z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export function HomeVisitIcon(props) {
  return (
    <svg viewBox="-4.5 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.469 12.594l3.625 3.313c.438.406.313.719-.281.719h-2.719v8.656c0 .594-.5 1.125-1.094 1.125h-4.719v-6.063c0-.594-.531-1.125-1.125-1.125h-2.969c-.594 0-1.125.531-1.125 1.125v6.063H4.343c-.594 0-1.125-.531-1.125-1.125v-8.656H.53c-.594 0-.719-.313-.281-.719l10.594-9.625c.438-.406 1.188-.406 1.656 0l2.406 2.156V6.719c0-.594.531-1.125 1.125-1.125h2.344c.594 0 1.094.531 1.094 1.125v5.875z" />
    </svg>
  )
}



//ByNada
export function GoogleIcon() {
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
}

//ByNada
export function FacebookIcon() {
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"></path>
  </svg>
}