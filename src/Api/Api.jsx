import axios from "axios";
const apiUrl ="https://localhost:7220/";
export const Getproduct = async () => {
    try {
      const resp = await axios.get(apiUrl + "api/Products/GetProduct");
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  export const GetCategory = async () => {
    try {
      const resp = await axios.get(apiUrl + "api/Categories/GetCategory");
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  
  export const RemoveProduct = async (id) => {
    try {
      const resp = await axios.delete(apiUrl + `api/Products/DeleteProduct?id=${id}`);
  
      if (resp.status === 200) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return err.response;
    }
  };
  export const AddProduct= async (
   name,
   price,
   catagoriesId
  ) => {
   const payload={
    name:name,
    price:price,
    catagoriesId:catagoriesId
    }
    try {
      const response = await axios.post(apiUrl + "api/Products/AddProduct", payload);
      return response;
    } catch (error) {
      console.error("Error uploading project:", error);
      throw error; // Re-throw the error for higher-level handling
    }
  };
  export const UpdateProduct = async (id, name, price, categoryId) => {
    const updatedProduct = {
      id: id,
      name: name,
      price: price,
      catagoriesId: categoryId,
    };
  
    try {
      const response = await axios.put(
        apiUrl+`api/Products/UpdateProduct?id=${id}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the updated product
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  