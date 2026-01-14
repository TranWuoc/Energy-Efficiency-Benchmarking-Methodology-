import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
    open: boolean;
    title?: string;
    description?: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function DeleteResponsiveDialog({
    open,
    title = 'Xác nhận xoá',
    description = 'Bạn có chắc chắn muốn xoá mục này? Hành động này không thể hoàn tác.',
    loading = false,
    onCancel,
    onConfirm,
}: Props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={loading ? undefined : onCancel}
            aria-labelledby="responsive-delete-dialog-title"
        >
            <DialogTitle id="responsive-delete-dialog-title">{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel} disabled={loading}>
                    Huỷ
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : undefined}
                >
                    Xoá
                </Button>
            </DialogActions>
        </Dialog>
    );
}
