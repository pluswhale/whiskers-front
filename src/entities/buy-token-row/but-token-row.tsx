import { FC, ReactElement } from 'react';
import styles from './but-token-row.module.scss';
import { Typography } from '../../shared/components/typography';
import { Button } from '../../shared/components/button';
import { useMediaQuery } from 'react-responsive';
import { Flip, toast } from 'react-toastify';
import { buySpinsByUser } from '../../shared/components/api/user/thunks';
import { useAppContext } from '../../app/providers/AppContext';

type BuyRow = {
    id: number;
    countSpin: number;
    countWhisk: number;
};

export const BuyTokenRow: FC<BuyRow> = (row): ReactElement => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const { updateBonusSpins } = useAppContext();

    const { id, countSpin, countWhisk } = row;

    const onBuyBonusToken = async (countSpin: number) => {
        const res = await buySpinsByUser('1', { countSpins: countSpin });

        if (res?.status === 200) {
            updateBonusSpins(countSpin);

            toast.success(`You bought ${countSpin} spins`, {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Flip,
            });
        } else {
            toast.error(`Can't buy spins.`, {
                position: 'bottom-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Flip,
            });
        }
    };
    return (
        <div key={id} className={styles.buy_row__wrapper}>
            <div className={styles.buy_row__container}>
                <div className={styles.buy_row__spins}>
                    <Typography fontSize={isMobile ? '28px' : '50px'} fontFamily="Roundy Rainbows, sans-serif">
                        {countSpin}
                    </Typography>
                    <Typography fontSize={isMobile ? '18px' : '24px'} fontFamily="Montserrat, sans-serif">
                        spins
                    </Typography>
                </div>
                <div className={styles.buy_row__whisks}>
                    <Typography fontSize={isMobile ? '18px' : '28px'} fontFamily="Montserrat, sans-serif">
                        {countWhisk}K
                    </Typography>
                    <Typography fontSize={isMobile ? '18px' : '26px'} fontFamily="Montserrat, sans-serif">
                        WHISK
                    </Typography>
                </div>
                <Button
                    onClick={() => onBuyBonusToken(countSpin)}
                    fontFamily={'Montserrat, sans-serif'}
                    height={isMobile ? '28px' : '52px'}
                    fontSize={isMobile ? '16px' : '28px'}
                    text={'Buy now'}
                    fontWeight={'normal'}
                    width={'fit-content'}
                    textTransform={'none'}
                    borderRadius="24px"
                />
            </div>
        </div>
    );
};
