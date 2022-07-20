interface GetTokenResponse {
    data: GetTokenResponseSuccess | GetTokenResponseFailure
    code: number
}

interface GetTokenResponseSuccess {
    accessToken: string,
    walletPublicAddress: string,
    nftContractAddress: string,
    nftId: string,
    iat: number,
    exp: number,
}

interface GetTokenResponseFailure {
    errorCode: string,
    errorMessage?: string,
    errorUri?: string,
}

export default GetTokenResponse;