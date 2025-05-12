
// png 파일 인식하게 해주는 타입스크립트 코드

declare module '*.png' {
    const value: string;
    export default value;
}