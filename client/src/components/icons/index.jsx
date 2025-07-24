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
  );
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
  );
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
  );
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
  );
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
  );
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
  );
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
  );
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
  );
}

export function ChatIcon(props) {
  return (
    <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1242.353 451.753v1016.471H757.496l-418.672 418.673v-418.673H0V451.754h1242.353zM1920.033.033v1016.471h-225.881v419.012l-338.937-338.936V338.857H677.681V.034h1242.353zM677.76 1016.46H338.824v112.94H677.76v-112.94zm225.77-225.882H338.823V903.63h564.705V790.577z"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function HomeVisitIcon(props) {
  return (
    <svg viewBox="-4.5 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.469 12.594l3.625 3.313c.438.406.313.719-.281.719h-2.719v8.656c0 .594-.5 1.125-1.094 1.125h-4.719v-6.063c0-.594-.531-1.125-1.125-1.125h-2.969c-.594 0-1.125.531-1.125 1.125v6.063H4.343c-.594 0-1.125-.531-1.125-1.125v-8.656H.53c-.594 0-.719-.313-.281-.719l10.594-9.625c.438-.406 1.188-.406 1.656 0l2.406 2.156V6.719c0-.594.531-1.125 1.125-1.125h2.344c.594 0 1.094.531 1.094 1.125v5.875z" />
    </svg>
  );
}


export function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}


export function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function Shapes(props) {
  return (
    <svg
      width={241}
      height={190}
      viewBox="0 0 241 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M408.236-190.028c37.722-10.725 72.037-19.248 102.196-21.069 30.137-1.82 55.952 3.062 76.817 18.975 20.879 15.923 37.038 43.071 47.462 86.288 41.68 172.8-64.613 346.67-237.413 388.35-172.799 41.68-346.67-64.613-388.35-237.412-10.43-43.238-9.064-74.626 1.308-98.089C20.613-76.413 40.069-92.2 66.41-103.999c26.373-11.812 59.5-19.558 96.995-26.975 37.441-7.407 79.221-14.482 122.662-24.961 43.44-10.478 84.499-23.383 122.168-34.093z"
        fill="url(#paint0_linear_255_1914)"
        fillOpacity={0.1}
        stroke="url(#paint1_linear_255_1914)"
        strokeWidth={3}
      />
      <defs>
        <linearGradient
          id="paint0_linear_255_1914"
          x1={246.009}
          y1={-344.705}
          x2={397.65}
          y2={283.975}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FB7FF" />
          <stop offset={1} stopColor="#75ADF5" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_255_1914"
          x1={246.009}
          y1={-344.705}
          x2={397.65}
          y2={283.975}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Shapes2(props) {
  return (
    <svg
      width={286}
      height={169}
      viewBox="0 0 286 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={194.049}
        cy={193.85}
        r={191.684}
        fill="url(#paint0_linear_255_1913)"
        fillOpacity={0.2}
        stroke="url(#paint1_linear_255_1913)"
        strokeWidth={3}
      />
      <defs>
        <linearGradient
          id="paint0_linear_255_1913"
          x1={194.049}
          y1={0.666016}
          x2={194.049}
          y2={387.033}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FB7FF" />
          <stop offset={1} stopColor="#75ADF5" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_255_1913"
          x1={194.049}
          y1={0.666016}
          x2={194.049}
          y2={387.033}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#EEE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Shapes3({className, ...rest}) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 148 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M70.665 10.938c11.7-3.975 22.27-7.169 31.611-8.208 9.317-1.037 17.241.09 23.784 4.576 6.557 4.496 11.975 12.534 15.906 25.846 15.707 53.177-14.668 109.018-67.846 124.726C20.942 173.585-34.9 143.209-50.607 90.032c-3.937-13.332-3.953-22.98-1.175-30.234 2.765-7.22 8.402-12.338 16.37-16.402 7.997-4.078 18.197-7.02 29.88-9.952 11.631-2.918 24.718-5.822 38.25-9.819 13.531-3.997 26.297-8.728 37.947-12.687z"
        fill="url(#paint0_linear_255_1907)"
        fillOpacity={0.1}
        stroke="url(#paint1_linear_255_1907)"
        strokeWidth={3}
      />
      <defs>
        <linearGradient
          id="paint0_linear_255_1907"
          x1={16.815}
          y1={-36.1339}
          x2={74.5448}
          y2={159.317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FB7FF" />
          <stop offset={1} stopColor="#75ADF5" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_255_1907"
          x1={16.815}
          y1={-36.1339}
          x2={74.5448}
          y2={159.317}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Shapes4({ className, ...rest }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 154 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M76.92-34.432c11.702-3.975 22.271-7.169 31.612-8.208 9.317-1.037 17.241.09 23.784 4.576 6.557 4.496 11.975 12.534 15.906 25.846C163.929 40.959 133.553 96.8 80.376 112.506 27.198 128.214-28.644 97.839-44.351 44.661c-3.938-13.331-3.953-22.978-1.175-30.233 2.765-7.221 8.402-12.338 16.37-16.402 7.997-4.078 18.196-7.02 29.88-9.952 11.631-2.918 24.718-5.822 38.25-9.819 13.53-3.997 26.297-8.729 37.947-12.687z"
        fill="url(#paint0_linear_255_1906)"
        fillOpacity={0.4}
        stroke="url(#paint1_linear_255_1906)"
        strokeWidth={3}
      />
      <defs>
        <linearGradient
          id="paint0_linear_255_1906"
          x1={23.0708}
          y1={-81.504}
          x2={80.8006}
          y2={113.947}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FB7FF" />
          <stop offset={1} stopColor="#75ADF5" stopOpacity={0.3} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_255_1906"
          x1={23.0708}
          y1={-81.504}
          x2={80.8006}
          y2={113.947}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
