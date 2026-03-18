export const API_ENDPOINTS = {


    login: 'api/auth/login/',
    register: 'api/auth/register/',
    logout: 'api/auth/logout/',

    verifyEmail: 'api/auth/verify-email/',

    forgotPassword: 'api/auth/forgot-password/',
    changePassword: 'api/auth/change-password/',
    resetPassword: 'api/auth/reset-password/',

    resendOtp: 'api/auth/resend-otp/',
    refreshToken: 'api/auth/token/refresh/',
    logoutRequest: 'api/auth/logout/',
    students: 'api/students/',
    studentBySlug: (slug: string) => `api/students/${slug}/`,

};

