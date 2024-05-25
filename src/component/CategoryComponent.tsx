import { useCallback, useEffect, useState , useContext} from "react";
import Category from "../types/Category";
import {useNavigate} from "react-router-dom";
import { ProfileContext } from "../types/ProfileContext";
import FetchData from "../route/Fetch";

export default function CategoryComponent() {

    const profile = useContext(ProfileContext);
    const [data, setData] = useState<Category[]>();
    const navigate = useNavigate();

    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("5312a32a-2060-4a0b-8200-a174d93330b2")}`,
        },
      };
    
      const fetchData = useCallback(async () => {
        const response: Category[] = await FetchData(
          "https://library-crud-sample.vercel.app/api/category",
          options
        );
        setData(response);
      }, []);
    
      useEffect(() => {
        fetchData();
      }, []);
      
      const gotoEdit = (id: string) => {
        navigate("/EditComponent/" + id);
      };

    async function deleteCategory(id: string){
        const token = localStorage.getItem("5312a32a-2060-4a0b-8200-a174d93330b2");
        const url ='https://library-crud-sample.vercel.app/api/category/' + id;

        const option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + token,
            },
        };

        try {
            const response = await fetch(url, option);
            if(!response.ok){
                throw new Error("Delete Failed");
            }
            setTimeout(() => {
                alert("Delete Success");
                navigate("/Dashboard");
            }, 500);

        } catch (error) {
            console.error("Error:", error);
        }

    }

    return (
        <>
            <div className=" flex justify-center text-xl font-semibold m-4">
                <h1>Category List</h1>
            </div>
            <div className="flex justify-center text-xl font-semibold">
                <div className="border-2 px-10 py-4">
                    <ul>
                        {data &&
                        data.map((item) => (
                            <li key={item.id}>
                                <b>Name:</b> {item.category_name} <br />
                                <b>Description:</b> {item.category_description} <br />
                                <b>Status:</b> {item.is_active ? "Active" : "Not Active"}
                                <div className="mb-5 mt-1">
                                    <button
                                        className="border-2 px-2 mr-2"
                                        onClick={() => {
                                        gotoEdit(item.id);
                                        console.log(item.id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="border-2 px-2 mx-2"
                                        onClick={() => deleteCategory(item.id)
                                    }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>                
            </div>
        </>
    )
}