"use client";

import { useState, useCallback, useEffect } from "react";

export type Booking = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantEmoji: string;
  userName: string;
  userEmail: string;
  userRestriction: string;
  date: string;
  time: string;
  partySize: number;
  requests: string;
  status: "Waiting" | "Confirmed" | "Declined";
  createdAt: string;
};

type Listener = () => void;

let bookings: Booking[] = [
  { id: "b_001", restaurantId: "rest_the_italian_kitchen", restaurantName: "The Italian Kitchen", restaurantEmoji: "🍝", userName: "Sarah M.", userEmail: "sarah@dietaryid.com", userRestriction: "Celiac", date: "2024-01-20", time: "19:00", partySize: 2, requests: "Verified gluten-free options", status: "Waiting", createdAt: "2024-01-15T10:00:00Z" },
  { id: "b_002", restaurantId: "rest_fresh_bowl", restaurantName: "Fresh Bowl", restaurantEmoji: "🥗", userName: "Mike H.", userEmail: "mike@email.com", userRestriction: "Gluten-Free", date: "2024-01-19", time: "12:30", partySize: 4, requests: "Separate prep area if possible", status: "Waiting", createdAt: "2024-01-14T14:00:00Z" },
  { id: "b_003", restaurantId: "rest_the_italian_kitchen", restaurantName: "The Italian Kitchen", restaurantEmoji: "🍝", userName: "Jordan L.", userEmail: "jordan@email.com", userRestriction: "Nut Allergy", date: "2024-01-21", time: "18:00", partySize: 3, requests: "Need to discuss allergy procedures", status: "Waiting", createdAt: "2024-01-13T09:00:00Z" },
];

let myBookings: Booking[] = [];

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function getBookings(): Booking[] {
  return bookings;
}

export function getMyBookings(): Booking[] {
  return myBookings;
}

export function createBooking(data: Omit<Booking, "id" | "createdAt" | "status">): Booking {
  const b: Booking = {
    ...data,
    id: `b_${Date.now()}`,
    status: "Waiting",
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(b);
  myBookings.unshift(b);
  emit();
  return b;
}

export function confirmBooking(id: string) {
  bookings = bookings.map((b) => b.id === id ? { ...b, status: "Confirmed" } : b);
  myBookings = myBookings.map((b) => b.id === id ? { ...b, status: "Confirmed" } : b);
  emit();
}

export function declineBooking(id: string) {
  bookings = bookings.map((b) => b.id === id ? { ...b, status: "Declined" } : b);
  myBookings = myBookings.map((b) => b.id === id ? { ...b, status: "Declined" } : b);
  emit();
}

export function useBookings() {
  const [list, setList] = useState(bookings);

  useEffect(() => {
    const unsub = subscribe(() => setList([...bookings]));
    return unsub;
  }, []);

  return list;
}

export function useMyBookings() {
  const [list, setList] = useState(myBookings);

  useEffect(() => {
    const unsub = subscribe(() => setList([...myBookings]));
    return unsub;
  }, []);

  return list;
}

function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
