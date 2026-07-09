<template>
    <div v-if="isOpen" class="payment-modal-overlay">
        <div class="payment-modal">

            <div class="payment-modal-header">

                <div class="payment-modal-header-title">
                    BTC account
                </div>

                <button class="game-history-modal-close" @click="handleCloseModal">
                    <img src="/svg/close.svg" alt="close" />
                </button>

            </div>

            <div class="payment-modal-content">

                <div class="payment-modal-content-left">

                    <div class="wallet-qr__code">
                        <img src="/png/qr-code.png" alt="" />
                    </div>

                    <div class="wallet-info">

                        <div class="wallet-info-balance">

                            <div class="wallet-info-balance-price">
                                <div class="wallet-info-balance-price-title">
                                    Your Bitcoin balance
                                </div>

                                <div class="wallet-info-balance-price-value">
                                    <div class="wallet-info-balance-price-value-amount">0.003213</div>
                                    <!-- ИКОНКА ВНИЗ + СПИСОК -->
                                    <div class="wallet-info-balance-price-value-currency">
                                        BTC
                                        <img src="/svg/direction-bottom.svg" alt="arrow-down" />
                                    </div>
                                </div>
                            </div>

                            <div class="wallet-info-history">
                                <div class="wallet-info-history-title">
                                    History
                                    <img src="/svg/direacti-right-purple.svg" alt="arrow-down" />
                                </div>
                            </div>
                        </div>

                        <div class="wallet-info-balance-value">≈ $550 000</div>

                    </div>

                    <div class="wallet-info-address">

                        <div class="wallet-info-address-title">Address info</div>

                        <div class="wallet-info-address-info">

                            <span>92das8d9asdh89dsa8dupaosd2e32e213</span>

                            <div class="wallet-info-address-info-actions">
                                <button class="copy-btn" @click="copyAddress">
                                    <CopyIcon />
                                </button>
                                <button class="share-btn" @click="shareAddress">
                                    <img src="/svg/share.svg" alt="share" width="20" height="20" />
                                </button>
                            </div>

                        </div>

                        <div class="update-address">
                            <new-oracle-button color="yellow" :text="$t('dashboard.updateAddress')"
                                :icon="'/svg/exchange.svg'" @click="updateAddress = true" />
                        </div>

                    </div>

                </div>
                <div class="payment-modal-content-right">

                    <div class="payment-modal-content-right-title">
                        <span class="payment-modal-content-right-title-text">Your Transactions</span>

                        <div class="your-transactions__card">
                            <div class="card-item card-expenses">
                                <h4 class="transaction-title">{{ $t('dashboard.yourExpensesMTD') }}</h4>
                                <h2 class="transaction-amount">$10,000</h2>
                            </div>
                            <div class="card-item card-deposit">
                                <h4 class="transaction-title">{{ $t('dashboard.yourDepositsMTD') }}</h4>
                                <h2 class="transaction-amount">$9,500</h2>
                            </div>
                        </div>
                    </div>

                    <div class="payment-modal-content-right-mixing">

                        <div class="payment-modal-content-right-mixing-title">
                            <span>Mixing</span>
                            <div class="payment-modal-content-right-mixing-title-icon">
                                <LeftArrowIcon />
                            </div>
                        </div>
                        <button class="payment-modal-start-mix-button">
                            <span class="button-icon">
                                <img src="/svg/create-icon.svg" alt="" />
                            </span>
                            Start New Mix
                        </button>
                    </div>


                    <div class="payment-modal-content-right-details">

                        <div class="payment-modal-content-right-details-title">
                            <span>Details</span>

                            <div class="payment-modal-content-right-details-title-content">
                                <div class="payment-modal-content-right-details-title-content-item">
                                    <div class="payment-modal-content-right-details-title-content-item-title">Limits
                                    </div>
                                    <div class="payment-modal-content-right-details-title-content-item-value">Feb 20,
                                        2025</div>
                                </div>

                                <div class="payment-modal-content-right-details-title-content-item">
                                    <div class="payment-modal-content-right-details-title-content-item-title">Created
                                        Date
                                    </div>
                                    <div class="payment-modal-content-right-details-title-content-item-value">May 20,
                                        2025</div>
                                </div>

                                <div class="payment-modal-content-right-details-title-content-item">
                                    <div class="payment-modal-content-right-details-title-content-item-title">
                                        Transactions
                                    </div>
                                    <div class="payment-modal-content-right-details-title-content-item-value">120</div>
                                </div>
                            </div>
                        </div>

                        <div class="payment-modal-content-right-details-content">

                            <div class="payment-modal-content-right-details-content-item">
                                <div class="payment-modal-content-right-details-content-item-title">Fees</div>
                                <div class="payment-modal-content-right-details-content-item-icon">
                                    <LeftArrowIcon />
                                </div>
                            </div>

                            <div class="payment-modal-content-right-details-content-item">
                                <div class="payment-modal-content-right-details-content-item-title">History</div>
                                <div class="payment-modal-content-right-details-content-item-icon">
                                    <LeftArrowIcon />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyIcon from "@/assets/svg/moresettings/copy.svg?component";
import ShareIcon from "@/assets/svg/share-icon.svg?component";
import NewOracleButton from "~/components/new-oracle-button.vue";
import LeftArrowIcon from "@/assets/svg/arrow-left.svg?component";

const isOpen = ref(true);
const updateAddress = ref<boolean>(false);
const addressRef = ref<HTMLElement | null>(null);
const { t } = useI18n()

const handleCloseModal = () => {
    isOpen.value = false;
}

// Methods
const copyAddress = () => {
    const element = addressRef.value;
    if (!element) return;

    const range = document.createRange();
    range.selectNodeContents(element);

    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
    }

    navigator.clipboard.writeText(element.innerText);
};

const shareAddress = () => {
    if (navigator.share) {
        navigator
            .share({
                title: t("dashboard.myWalletAddress"),
                text: "92das8d9asdh89dsa8dupaosd2e32e213",
                url: window.location.href,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing:", error));
    } else {
        alert(t("dashboard.shareNotSupported"));
    }
};
</script>

<style lang="scss" scoped>
.payment-modal-overlay {
    width: 100vw;
    height: 100vh;
    background-color: #000000CC;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .payment-modal {
        display: flex;
        flex-direction: column;
        max-width: 873px;
        min-height: 591px;
        width: 100%;
        border-radius: 30px;
        padding: 20px 24px;
        background-color: #14131B;
        gap: 24px;
        font-family: "Roboto", sans-serif;


        .payment-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .payment-modal-header-title {
                font-family: Roboto, sans-serif;
                font-weight: 700;
                font-size: 20px;
                line-height: 140%;
            }

            .game-history-modal-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px 18px;
                border-radius: 20px;
                transition: background 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    background: #2b2741;
                }

                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }

        .payment-modal-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;

            .payment-modal-content-left {
                display: flex;
                flex-direction: column;
                gap: 24px;
                padding-right: 24px;
                border-right: 1px solid #443D69;

                .wallet-qr__code {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-height: 210px;
                    gap: 10px;

                    img {
                        width: 210px;
                        height: 210px;
                    }
                }

                .wallet-info {
                    display: flex;
                    flex-direction: column;
                    padding: 12px 0;
                    gap: 12px;

                    .wallet-info-balance {
                        display: flex;
                        padding: 0 16px;

                        .wallet-info-balance-price {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;

                            .wallet-info-balance-price-title {
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 145%;

                            }

                            .wallet-info-balance-price-value {
                                display: flex;
                                align-items: flex-end;
                                gap: 8px;

                                .wallet-info-balance-price-value-amount {
                                    font-family: Hector, sans-serif;
                                    font-weight: 400;
                                    font-size: 32px;
                                    line-height: 125%;
                                    letter-spacing: 0;
                                }

                                .wallet-info-balance-price-value-currency {
                                    display: flex;
                                    max-height: 26px;
                                    height: 100%;
                                    align-items: center;
                                    justify-content: space-around;
                                    font-weight: 500;
                                    font-size: 14px;
                                    line-height: 145%;
                                    letter-spacing: 0;
                                    padding-bottom: 6px;

                                    img {
                                        width: 14px;
                                        height: 14px;

                                    }
                                }
                            }
                        }

                        .wallet-info-history {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;

                            .wallet-info-history-title {
                                display: flex;
                                align-items: center;
                                max-width: 82px;
                                width: 100%;
                                color: #BFB7FF;
                                font-size: 12px;
                                font-weight: 500;
                                line-height: 135%;
                                letter-spacing: 0;
                                border-radius: 10px;
                                padding: 7px 10px;
                                border: 1px solid transparent;
                                transition: all 0.2s ease;

                                &:hover {
                                    cursor: pointer;
                                    border: 1px solid #443D69;
                                }

                                img {
                                    padding: 4px;
                                    width: 18px;
                                    height: 18px;
                                }
                            }

                        }
                    }

                    .wallet-info-balance-value {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 120%;
                        letter-spacing: 0;
                        padding: 0 16px;
                    }
                }

                .wallet-info-address {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    .wallet-info-address-title {
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 150%;
                        letter-spacing: 0;
                    }

                    .wallet-info-address-info {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        border-radius: 16px;
                        height: 44px;
                        padding: 8px 16px;
                        background-color: #1B1A24;

                        .wallet-info-address-info-actions {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            gap: 12px;
                            max-width: 52px;
                            height: 20px;
                            width: 100%;

                            .copy-btn {
                                cursor: pointer;
                                color: #7A74BA;

                                :deep(svg) {
                                    width: 20px;
                                    height: 20px;

                                    path {
                                        fill: #7A74BA;
                                    }
                                }
                            }
                        }

                        span {
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 145%;
                            letter-spacing: 0;
                            max-width: 316px;
                            width: 100%;
                        }

                    }
                }
            }

            .payment-modal-content-right {
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .payment-modal-content-right-title {
                    span {
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 150%;
                        letter-spacing: 0;
                    }

                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 4px 0;
                }

                .payment-modal-content-right-mixing {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 4px 0;

                    .payment-modal-content-right-mixing-title {
                        display: flex;
                        align-items: center;
                        gap: 4px;

                        .payment-modal-content-right-mixing-title-icon {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 20px;
                            height: 20px;

                        }

                        &:hover {
                            cursor: pointer;
                        }

                    }

                    .payment-modal-start-mix-button {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        border-radius: 14px;
                        padding: 11px 16px;
                        cursor: pointer;
                        font-family: "Roboto", sans-serif;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 145%;
                        letter-spacing: 0;
                        color: #fff;
                        transition: 0.2s;
                        background: #1e1d28;
                        border: none;

                        &:hover {
                            background: #f64e2a;
                            box-shadow: 0 0 10px rgba(246, 78, 42, 0.25);
                        }

                        .button-icon {
                            line-height: 0;
                            max-width: 112px;
                            display: flex;
                            flex: 1;
                        }
                    }
                }

                .payment-modal-content-right-details {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 4px 0;

                    .payment-modal-content-right-details-title {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;

                        span {
                            font-weight: 600;
                            font-size: 16px;
                            line-height: 150%;
                            letter-spacing: 0;
                        }

                        .payment-modal-content-right-details-title-content {
                            display: flex;
                            gap: 24px;

                            .payment-modal-content-right-details-title-content-item {

                                height: fit-content;

                                display: flex;
                                flex-direction: column;
                                flex: 1;
                                gap: 4px;

                                .payment-modal-content-right-details-title-content-item-title {
                                    font-weight: 500;
                                    font-size: 12px;
                                    line-height: 135%;
                                    color: #BFB7FF;
                                }

                                .payment-modal-content-right-details-title-content-item-value {
                                    font-weight: 400;
                                    font-size: 14px;
                                    line-height: 145%;
                                }
                            }
                        }
                    }

                    .payment-modal-content-right-details-content {
                        display: flex;
                        flex-direction: column;

                        .payment-modal-content-right-details-content-item {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            border-bottom: 1px solid #2B2741;
                            height: 48px;
                            padding: 12px 16px;

                            &:hover {
                                cursor: pointer;
                                background-color: #2B2741;
                            }

                            .payment-modal-content-right-details-content-item-title {
                                font-weight: 300;
                                font-size: 14px;
                                line-height: 130%;
                            }

                            .payment-modal-content-right-details-content-item-icon {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: 24px;
                                height: 24px;
                            }
                        }


                    }
                }



            }
        }
    }
}
</style>