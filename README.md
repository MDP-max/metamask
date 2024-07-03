<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>ElectricDoge</title>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

    <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />

</head>

<style>

    .img-wrap {

        cursor: pointer;

    }

</style>

<body>

<div class="userEL13252712">

    <div class="container">

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-12 no-padding innerbox multi-columns-row" data-clone-loop="true" data-clone-min="1" data-clone-max="6" data-clone-fixed="true" data-child="4">

                <div class="item col-md-3 col-sm-3 col-xs-3">

                    <div class="img-wrap">

                        <img src="https://lh3.googleusercontent.com/8agrJMvxuqKFOJhB3OwWKm-lW1qZARU02RAMH5WFiiUFraJKfmcSnqOmudPzQfIe7DePy7xsqVwBDlErOr2zRHW9x4vF1PQ0iwvPBYp30-__ceIvjgBsgw=w800" class="img-responsive" alt="002_(3).png">

                    </div>

                </div>

                <div class="item col-md-3 col-sm-3 col-xs-3">

                    <div class="img-wrap">

                        <a href="https://apps.apple.com/kr/app/metadrive/id1616577185" target=""><img src="https://lh3.googleusercontent.com/Dce6Gue_ctrHTTTMGcpHQLhGQiOztFJGIRTPun6GiPti5-bjVg3DFZPE9W8vUbsNMSONO7hvpNj-_ofAoNYsxDK1wwYggGHEOL9b0REZSTpxY3WQbyFgqw=w800" class="img-responsive" alt="003_(2).png"></a>

                    </div>

                </div>

                <div class="item col-md-3 col-sm-3 col-xs-3">

                    <div class="img-wrap">

                        <a href="https://play.google.com/store/apps/details?id=com.probit.app.android2.release.global&amp;hl=ko" target=""><img src="https://lh3.googleusercontent.com/x5B86v4pkCgRKGhfDOcnthKB6OwPysDb8RDE7dQ6YCi5corSPSpNQUdC9UZWABasHz0yvTubN8HfAnf5Te5dG1DY-6ZbeqvHi8ilWn6Ho2B9T2tvFgZisw=w800" class="img-responsive" alt="제목을-입력해주세요_-004_(1).png"></a>

                    </div>

                </div>

                <div class="item col-md-3 col-sm-3 col-xs-3">

                    <div class="img-wrap" id="addToken">

                        <img src="https://lh3.googleusercontent.com/g6cnO91PNIiMARWTn30UJpR3sr6hJM5haZkb0TkOzuiBBBE-IZCLqv_wKoCAeWLabC8uq4wFPT6hi8nZwFxZrmglvh-ewlxwVrCJdSTvRSHrsRfyGCri=w800" class="img-responsive" alt="001_(3).png">

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

 

<script>

    function showToast(message) {

        Toastify({

            text: message,

            duration: 3000,

            close: true,

            gravity: "top",

            position: "right",

            stopOnFocus: true,

            style: {

                background: "linear-gradient(to right, #00b09b, #96c93d)",

            },

        }).showToast();

    }

 

    async function switchToPolygonChain() {

        const chainId = '0x89'; // Polygon Mainnet

        try {

            await ethereum.request({

                method: 'wallet_switchEthereumChain',

                params: [{ chainId: chainId }],

            });

        } catch (error) {

            if (error.code === 4902) {

                try {

                    await ethereum.request({

                        method: 'wallet_addEthereumChain',

                        params: [{

                            chainId: chainId,

                            chainName: 'Polygon Mainnet',

                            rpcUrls: ['https://polygon-rpc.com/'],

                            blockExplorerUrls: ['https://polygonscan.com'],

                            nativeCurrency: {

                                name: 'MATIC',

                                symbol: 'MATIC',

                                decimals: 18

                            }

                        }]

                    });

                } catch (addError) {

                    showToast('Failed to add Polygon network');

                    console.error(addError);

                }

            } else {

                showToast('Please switch to Polygon network manually');

                console.error(error);

            }

        }

    }

 

    async function TokenAdd() {

        if (!window.ethereum) {

            showToast("MetaMask is not installed.");

            return;

        }

 

        await switchToPolygonChain();

 

        try {

            await ethereum.request({ method: "eth_requestAccounts" });

            const tokenAdded = await ethereum.request({

                method: "wallet_watchAsset",

                params: {

                    type: "ERC20",

                    options: {

                        address: "0x52290A0976A4a101085aCeF8760BB80f2936a3AA",

                        symbol: "MDP",

                        decimals: 18,

                        image: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb9XLwo%2FbtsIjIJXOKS%2F549ZB7k1zoBnQrukv1QfYk%2Fimg.png"

                    },

                },

            });

 

            if (tokenAdded) {

                showToast("Token imported to Polygon network");

            }

        } catch (error) {

            showToast("An unexpected error occurred while adding the token");

            console.error("Error adding token", error);

        }

    }

 

    document.getElementById("addToken").addEventListener("click", TokenAdd);

</script>

 

<script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script>

</body>

</html>
