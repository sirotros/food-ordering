import { api } from "@/api";
export const deleteAll = async (url) => {
    try {
        const res = await api.delete(
            `/${url}`
        );
        return res.data
    } catch (err) {
        console.error(err.message);
    }
};
