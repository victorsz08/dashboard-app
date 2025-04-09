import axios from 'axios';
import { cookies } from 'next/headers';



const base = process.env.HOST_URL ?? 'http://localhost:3001/';

export const api = axios.create({
    baseURL: base,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});