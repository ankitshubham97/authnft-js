interface GetTokenResponse {
    data: GetTokenResponseSuccess | GetTokenResponseFailure
}

interface GetTokenResponseSuccess {
    token: string,
    walletPublicAddress: string,
    nftContractAddress: string,
    iat: number,
    exp: number,
}

interface GetTokenResponseFailure {
    message: string,
    code: number
}

export default GetTokenResponse;