import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

function LandingPage() {
    return (
        <div>
            <div>
                <Header />
            </div>
            {/* MainContent */}
            <div className=" h-[1000px]"></div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
