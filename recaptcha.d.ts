declare module "react-google-invisible-recaptcha" {
  export default class GoogleRecaptcha extends React.Component<{
    sitekey: string;
    locale?: string;
    onResolved?: () => void;
    badge?: "bottomright" | "bottomleft" | "inline";
    nonce?: string;
    onExpired?: () => void;
    onError?: () => void;
    onLoaded?: () => void;
    style?: CSSStyleDeclaration;
    tabindex?: number;
  }> {}
}
