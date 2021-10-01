import "../styles/globals.css";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import "../styles/login.css";
import "../styles/components/InputField.css";
import "../styles/components/Button.css";
import "../styles/components/ProductCard.css";
import "../styles/components/NotifCard.css";
import "../styles/modules/MiddleSection.css";
import "../styles/modules/RightSection.css";
import "../styles/modules/LeftSection.css";
import "../styles/modules/UserSection.css";
import "../styles/modules/TopProduct.css";
import "../styles/shared/Navbar.css";
import "../styles/product/ProductPage.css";
import "../styles/pages/New.css";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
