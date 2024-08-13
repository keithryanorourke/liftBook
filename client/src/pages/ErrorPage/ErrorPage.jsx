import { useSearchParams } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = ({propCode}) => {
    let [searchParams] = useSearchParams();
    const code = parseInt(searchParams.get("code")) || 500;
    const subtitle = (() => {
        switch (code) {
            case 403:
                return "Forbidden";
            case 404:
                return "Not Found";
            default:
                return "Unknown Error";
        }
    })();

    const description = (() => {
        switch (code) {
            case 403:
                return "You do not have access to the page or resource you are trying to view.";
            case 404:
                return "The page or resource you have requested could not be found.";
            default:
                return "An unknown error occured while trying to load the page our resource you have requested.";
        }
    })();

    return (
        <main>
            <h1 className="error-page__title">{code}</h1>
            <h2 className="error-page__subtitle">{subtitle}</h2>
            <p className="error-page__message">{description}</p>
        </main>
    )
}

export default ErrorPage;