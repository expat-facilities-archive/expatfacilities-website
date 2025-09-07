import Cookies from "js-cookie";
import NextScript from "next/script";
import React from "react";

const Script: React.FC = () => {
  const cookie = Cookies.get("cookie_params");
  const [doNotTrack, setDoNotTrack] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        navigator.doNotTrack &&
        (navigator.doNotTrack == "yes" || navigator.doNotTrack == "1")
      ) {
        setDoNotTrack(true);
      }
    }
  }, [setDoNotTrack]);

  return (
    <>
      {/* Google Tag Manager */}
      <NextScript
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NBKR2MW');`,
        }}
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NBKR2MW"
          height={0}
          width={0}
          style={{
            display: "none",
            visibility: "hidden",
          }}
        />
      </noscript>
      {/* Google Ads */}
      <NextScript
        src="https://www.googletagmanager.com/gtag/js?id=AW-10934493723"
        strategy="afterInteractive"
      />
      <NextScript id="google-ads" strategy="afterInteractive">
        {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'AW-10934493723');
                `}
      </NextScript>
      {process.env.NODE_ENV === "production" && !doNotTrack && (
        <>
          {/* Analytics */}
          {JSON.parse(cookie || "{}").analytics && (
            <>
              {/* HubSpot */}
              <NextScript
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src="https://js.hs-scripts.com/20009921.js"
              />
              {/* Facebook Pixel */}
              <NextScript
                strategy="afterInteractive"
                id="fb-pixel-script"
                dangerouslySetInnerHTML={{
                  __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1074709816593726');
                  fbq('track', 'PageView');
            `,
                }}
              />
              {/* Google Analytics */}
              <NextScript
                src="https://www.googletagmanager.com/gtag/js?id=G-PS29297DVQ"
                strategy="afterInteractive"
              />
              <NextScript id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-PS29297DVQ');
                `}
              </NextScript>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Script;
