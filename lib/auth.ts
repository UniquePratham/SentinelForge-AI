'use client';

export interface User {
  email: string;
  name: string;
}

export function loginUser(email: string, password: string): User | null {
  if (typeof window !== 'undefined') {
    const users = JSON.parse(localStorage.getItem('sentinelforge_users') || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      const userData = { email: user.email, name: user.name };
      localStorage.setItem('sentinelforge_user', JSON.stringify(userData));
      return userData;
    }
  }

  return null;
}

export function signupUser(email: string, name: string, password: string): boolean {
  if (typeof window !== 'undefined') {
    const users = JSON.parse(localStorage.getItem('sentinelforge_users') || '[]');

    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    users.push({ email, name, password });
    localStorage.setItem('sentinelforge_users', JSON.stringify(users));

    const userData = { email, name };
    localStorage.setItem('sentinelforge_user', JSON.stringify(userData));
    return true;
  }

  return false;
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sentinelforge_user');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('sentinelforge_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
