import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SendIcon from '@mui/icons-material/Send';
import {
    Box,
    Button,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toastAction, toastError } from '../../../utils/toast';
import { useCreateBuilding } from '../hooks/useCreateBuilding';
import { generalInformationSchema } from './schemas/generalInformation.schema';
import GeneralInformationStep from './Sections/GeneralInformationStep';
import MonthlyElectricStep from './Sections/MonthlyElectricStep';
import OperationBuildingStep from './Sections/OperationBuildingStep';
import type { BuildingFormValues } from './type/type';
import { formatBuildingPayload } from './utils/formatBuildingPayload';

const STEPS = [
    { key: 'general', label: 'Thông tin chung', desc: 'Thông tin chung về toà nhà' },
    { key: 'operation', label: 'Vận hành toà nhà', desc: 'Thông tin vận hành theo khu vực' },
    { key: 'monthly', label: 'Điện năng tiêu thụ', desc: 'Điện tiêu thụ theo tháng' },
];

export default function CreateBuildingWizard() {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const defaultValues = useMemo<BuildingFormValues>(
        () => ({
            generalInfo: {
                name: '',
                address: '',
                owner: '',
                buildingType: 1,
                commissioningYear: undefined,

                climateZone: '',
                controlSystemType: '',

                hasHVAC: false,
                hasLighting: false,
                hasWaterHeating: false,
                otherSystems: '',

                setpointTemperature: undefined,
                setpointHumidity: undefined,
                setpointLightingLevel: undefined,

                governmentSystemZones: [],
                commercialOfficeZones: [],

                totalFloorArea: undefined,
                aboveGroundFloorArea: undefined,
                basementFloorArea: undefined,

                indoorParkingArea: undefined,
                outdoorParkingArea: undefined,
                parkingAnnualElectricity: [],

                dataCenterArea: undefined,
                dataCenterAnnualElectricity: [],

                nonRentableArea: undefined,
                totalRentableArea: undefined,
                vacantArea: undefined,
            },
            operation: {
                governmentZones: [],
                commercialZones: [],
            },
            consumedElectricity: [],
            producedElectricity: [],
        }),
        [],
    );

    const buildingWizardSchema = yup.object({
        generalInfo: generalInformationSchema.required(),
        operation: yup.mixed().notRequired(),
        consumedElectricity: yup.mixed().notRequired(),
    });

    const methods = useForm<BuildingFormValues>({
        defaultValues,
        resolver: yupResolver(buildingWizardSchema as yup.ObjectSchema<BuildingFormValues>),
        mode: 'onBlur',
    });

    const { handleSubmit, trigger } = methods;
    const createBuilding = useCreateBuilding();

    const onSubmit = (values: BuildingFormValues) => {
        const payload = formatBuildingPayload(values);
        createBuilding.mutate(payload, {
            onSuccess: (data) => {
                console.log('Create building success:', data);
                // toastSuccess('Tạo toà nhà thành công');
                toastAction('Tạo toà nhà thành công', {
                    label: 'Xem thông tin toà nhà',
                    onClick: () => {
                        navigate('/admin/dashboard');
                    },
                });
            },
            onError: (error) => {
                console.error('Create building failed:', error);
                toastError('Tạo toà nhà thất bại. Vui lòng xem lại các trường dữ liệu.');
            },
        });
    };

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return <GeneralInformationStep />;
            case 1:
                return <OperationBuildingStep />;
            case 2:
                return <MonthlyElectricStep />;
            default:
                return null;
        }
    };

    function getFirstErrorPath(errObj: any, prefix = ''): string | null {
        if (!errObj) return null;

        if (errObj?.message && prefix) return prefix;

        for (const key of Object.keys(errObj)) {
            const nextPrefix = prefix ? `${prefix}.${key}` : key;
            const found = getFirstErrorPath(errObj[key], nextPrefix);
            if (found) return found;
        }
        return null;
    }

    function scrollToField(name: string) {
        const el =
            document.querySelector(`[name="${CSS.escape(name)}"]`) || document.querySelector(`#${CSS.escape(name)}`);

        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (el instanceof HTMLElement) {
            setTimeout(() => el.focus?.(), 150);
        }
    }

    function scrollToTopAll() {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }

    const handleNext = async () => {
        const stepFieldPrefixes: Array<keyof BuildingFormValues> = ['generalInfo', 'operation', 'consumedElectricity'];
        const currentStepKey = stepFieldPrefixes[activeStep];

        const ok = await trigger(undefined, { shouldFocus: true });
        if (!ok) {
            await methods.handleSubmit(() => {})();

            const firstErrorPath = getFirstErrorPath(
                methods.formState.errors?.[currentStepKey],
                currentStepKey as string,
            );

            if (firstErrorPath) {
                scrollToField(firstErrorPath);
                methods.setFocus(firstErrorPath as any);
            }
            return;
        }

        if (activeStep === STEPS.length - 1) {
            handleSubmit(onSubmit)();
            return;
        }
        setActiveStep((s) => {
            const next = Math.min(s + 1, STEPS.length - 1);
            return next;
        });

        setTimeout(scrollToTopAll, 50);
    };

    const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

    return (
        <FormProvider {...methods}>
            <Container
                maxWidth="xl"
                sx={{
                    py: 4,
                    bgcolor: '#F8FBFF',
                    boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, minHeight: 520 }}>
                        {/* LEFT SIDEBAR */}
                        <Box sx={{ bgcolor: 'grey.50', borderRight: (t) => `1px solid ${t.palette.divider}` }}>
                            <Box sx={{ px: 2, py: 2 }}>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    Các bước khảo sát
                                </Typography>
                            </Box>
                            <Divider />
                            <List sx={{ p: 1 }}>
                                {STEPS.map((s, idx) => {
                                    const selected = idx === activeStep;
                                    return (
                                        <ListItemButton
                                            key={s.key}
                                            selected={selected}
                                            onClick={() => setActiveStep(idx)}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 0.5,
                                                '&.Mui-selected': { bgcolor: 'primary.50' },
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography fontWeight={selected ? 800 : 600}>
                                                        {idx + 1}. {s.label}
                                                    </Typography>
                                                }
                                                secondary={<Typography variant="caption">{s.desc}</Typography>}
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Box>

                        {/* RIGHT CONTENT */}
                        <Box
                            ref={contentRef}
                            sx={{
                                p: { xs: 2, md: 3 },
                                overflowY: 'auto',
                                maxHeight: { xs: 'calc(100vh - 120px)', md: 'calc(100vh - 120px)' },
                            }}
                        >
                            <Stack spacing={1} sx={{ mb: 2 }}>
                                <Typography variant="h6" fontWeight={800}>
                                    {STEPS[activeStep].label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {STEPS[activeStep].desc}
                                </Typography>
                            </Stack>

                            <Divider sx={{ mb: 2 }} />

                            {renderStep()}

                            <Divider sx={{ mt: 3, mb: 2 }} />

                            <Stack direction="row" justifyContent="space-between">
                                <Button
                                    variant="outlined"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    startIcon={<ArrowForwardIosIcon sx={{ transform: 'rotate(180deg)' }} />}
                                >
                                    Quay lại
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    endIcon={activeStep === STEPS.length - 1 ? <SendIcon /> : <ArrowForwardIosIcon />}
                                >
                                    {activeStep === STEPS.length - 1 ? 'Gửi đi' : 'Tiếp tục'}
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </FormProvider>
    );
}
