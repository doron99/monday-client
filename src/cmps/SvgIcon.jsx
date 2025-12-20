import React from 'react'

const icons = {
  home: ({ size }) => (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <path
        d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),

  calendarCheck: ({ size }) => (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <path
        d="M5.99986 1.82129C6.41407 1.82129 6.74986 2.15708 6.74986 2.57129V4.10701H13.2499V2.57129C13.2499 2.15708 13.5856 1.82129 13.9999 1.82129C14.4141 1.82129 14.7499 2.15708 14.7499 2.57129V4.107H16.2856C16.7876 4.107 17.269 4.30643 17.624 4.66141C17.979 5.01639 18.1784 5.49784 18.1784 5.99986V16.2856C18.1784 16.7876 17.979 17.269 17.624 17.624C17.269 17.979 16.7876 18.1784 16.2856 18.1784H3.71415C3.21213 18.1784 2.73067 17.979 2.37569 17.624C2.02071 17.269 1.82129 16.7876 1.82129 16.2856V5.99986C1.82129 5.49784 2.02071 5.01639 2.37569 4.66141C2.73067 4.30643 3.21213 4.107 3.71415 4.107H5.24986V2.57129ZM13.4214 9.92231L8.75058 12.9825L7.02129 11.6856"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

 layout: ({ size }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
    <path
      d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5V4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6V4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
),


  people: ({ size }) => (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <rect width="20" height="20" rx="3.63636" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8621 6.97735C12.8621 8.53537 11.6127 9.79841 10.0716 9.79841C8.53054 9.79841 7.28122 8.53537 7.28122 6.97735C7.28122 5.41929 8.53054 4.15625 10.0716 4.15625C11.6127 4.15625 12.8621 5.41929 12.8621 6.97735ZM5.16364 14.7105C5.34269 12.6195 6.79164 10.8633 10.0839 10.8633C13.3761 10.8633 14.825 12.6195 15.0041 14.7105C15.0255 14.9607 14.8197 15.1647 14.5687 15.1647H5.59905C5.34801 15.1647 5.14223 14.9607 5.16364 14.7105Z"
        fill="#fff"
      />
    </svg>
  ),

  status: ({ size }) => (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <rect width="20" height="20" rx="3.63636" fill="currentColor" />
      <rect x="5.2" y="5.4" width="9.3" height="2.7" rx="0.45" fill="#fff" />
      <rect x="5.2" y="8.6" width="9.3" height="2.7" rx="0.45" fill="#fff" />
      <rect x="5.2" y="11.8" width="9.3" height="2.7" rx="0.45" fill="#fff" />
    </svg>
  ),

  date: ({ size }) => (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <rect width="20" height="20" rx="3.63636" fill="currentColor" />
      <path
        d="M6.9 4.8V6.2H5.6C4.7 6.2 4 7 4 7.8V13.3C4 14.2 4.7 15 5.6 15H14.4C15.3 15 16 14.2 16 13.3V7.8C16 7 15.3 6.2 14.4 6.2H13.1V4.8C13.1 4.4 12.8 4.1 12.4 4.1C12 4.1 11.7 4.4 11.7 4.8V6.2H8.3V4.8C8.3 4.4 8 4.1 7.6 4.1C7.2 4.1 6.9 4.4 6.9 4.8Z"
        fill="#fff"
      />
    </svg>
  ),
}

export function SvgIcon({
  icon,
  size = 16,
  color = '#6b6c72',
  className = '',
}) {
  const Icon = icons[icon]
  if (!Icon) return null

  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
      }}
    >
      <Icon size={size} />
    </span>
  )
}
