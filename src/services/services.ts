import Cookies from "universal-cookie";
import { Wallet } from "./Wallet";

const portFromUrl = (typeof window !== "undefined")
    ? window.location.hash.match(/port=([0-9]+)/)
    : null;

const cookie = new Cookies();
const port = (portFromUrl ? portFromUrl[1] : null) || cookie.get("port") || "8642";
cookie.set("port", port);

export const wallet = new Wallet(port);

export const initServices = () => wallet.initServices();
