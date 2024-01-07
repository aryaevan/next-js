import NavBar from "./navbar";
import ProductList from "./products";
import Weather from "./weather";


export default function Shop(){
    return(
      <>
        {/* <NavBar /> */}
        <Weather />
        <ProductList />
      </>
    )
}