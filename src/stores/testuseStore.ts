// src/stores/testuseStore.ts
"use client";

import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
}

// Use the full URL directly
const API_URL = "https://backend.portalparaiso.com/api/v1/get-all-users";

export const testuseStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      console.log("📡 Fetching from:", API_URL);
      
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add if needed
          // "Authorization": "Bearer your-token",
        },
        // Add CORS options if needed
        mode: "cors",
      });

      console.log("📊 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Response data:", data);

      // Handle different response structures
      let usersData = [];
      
      if (data?.data && Array.isArray(data.data)) {
        usersData = data.data;
      } else if (data?.users && Array.isArray(data.users)) {
        usersData = data.users;
      } else if (Array.isArray(data)) {
        usersData = data;
      } else if (data?.data?.users && Array.isArray(data.data.users)) {
        usersData = data.data.users;
      } else {
        console.warn("Unexpected response structure:", data);
        usersData = [];
      }

      set({
        users: usersData,
        loading: false,
        error: null,
      });
      
      console.log(`✅ Loaded ${usersData.length} users`);
    } catch (error: any) {
      console.error("❌ Error fetching users:", error);
      
      set({
        loading: false,
        error: error.message || "Failed to fetch users",
        users: [],
      });
    }
  },
}));