import axios from "axios";
import { BACKEND_URL } from "../env";

export default axios.create({
    baseURL: BACKEND_URL + "v1.0",
    timeout: 5000
});