import React from 'react';
import Widget from './Widget';

const VerbatimSections = () => {
    const contentItems = [
        {
            title: 'What is Joy',
            id: 'what-is-joy',
            content: (
                <p className="genesis-body-text leading-relaxed">
                    JOY Genesis is the first Web3 gaming console capable of playing your beloved AAA titles and indie games. Optimised for the future of gaming, the device is powered by <strong>Joy Game OS powered by Hyperplay</strong>, and fully equipped with a camera and hardware wallet embedded for on-device identity and ownership. Discover the greatest of on-chain games, engage to earn with Joy’s ecosystem, and have a stake in the gaming communities you live and breathe in.
                </p>
            ),
            searchText: 'JOY Genesis is the first Web3 gaming console capable of playing your beloved AAA titles and indie games. Optimised for the future of gaming, the device is powered by Joy Game OS powered by Hyperplay, and fully equipped with a camera and hardware wallet embedded for on-device identity and ownership. Discover the greatest of on-chain games, engage to earn with Joy’s ecosystem, and have a stake in the gaming communities you live and breathe in.'
        },
        {
            title: 'About Us',
            id: 'about-us',
            content: (
                <div className="genesis-body-text space-y-4">
                    <p className="leading-relaxed">
                        We are a team of dedicated developers and gamers committed to revolutionising the Web3 gaming landscape. Our mission is to provide high-performance hardware that empowers players.
                    </p>
                    <p className="leading-relaxed">
                        Powered by community and driven by innovation, JOY is more than just a console—it's an invitation to own your digital legacy and play in worlds where your progress is truly yours.
                    </p>
                </div>
            ),
            searchText: 'We are a team of dedicated developers and gamers committed to revolutionising the Web3 gaming landscape. Our mission is to provide high-performance hardware that empowers players. Powered by community and driven by innovation, JOY is more than just a console—it\'s an invitation to own your digital legacy and play in worlds where your progress is truly yours.'
        }
    ];

    return (
        <section className="genesis-verbatim py-12 relative">
            <div className="genesis-container relative z-10">
                <div className="genesis-grid">
                    {contentItems.map((item) => (
                        <Widget key={item.id} gridSpan="col-span-6" className="verbatim-card">
                            <h2 className="genesis-h2 mb-6">{item.title}</h2>
                            {item.content}
                        </Widget>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .py-24 { padding: 6rem 0; }
        .mb-6 { margin-bottom: 1.5rem; }
        .verbatim-card {
          padding: 40px !important;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .genesis-body-text {
          line-height: 1.8 !important;
        }
        .genesis-h2 {
          font-size: 2rem;
          letter-spacing: -0.01em;
        }
      `}</style>
        </section>
    );
};

export default VerbatimSections;
