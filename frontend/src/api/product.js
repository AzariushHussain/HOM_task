import axios  from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/product/`;

export const getProducts = async (page, token) => {
    const { data } = await axios.get(`${API_URL}`, {
        params: { page },  // Use `params` instead of `query`
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
};

export const getProductById = async (token, id) => {
    const { data } = await axios.get(`${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return data;
}

export const createProduct = async (token, productData) => {
    console.log("sending data to add:", productData)
    const { data } = await axios.post(`${API_URL}`, productData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

export const updateProduct = async (token, id, productData) => {
    const { data } = await axios.put(`${API_URL}/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    );
    return data;
}

export const deleteProduct = async (token, id) => {
    const { data } = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    );
    return data;
}

