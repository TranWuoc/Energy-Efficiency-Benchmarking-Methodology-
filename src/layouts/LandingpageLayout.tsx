import LandingPage from '../app/LandingPage';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

function LandingPageLayout() {
    return (
        <div>
            <div>
                <Header />
            </div>
            {/* MainContent */}
            <div>
                <LandingPage />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPageLayout;
