import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  QrCode,
  CreditCard,
  Zap,
  Lock,
  Copy,
  CheckCircle2,
  Clock,
  Crown,
  Info,
  Tv,
} from 'lucide-react-native';
import { StreamHubColors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks';
import { VIP_PLANS } from '@/constants/mockData';
import { Plan } from '@/types';

type BillingCycle = 'monthly' | 'yearly';
type PaymentMethodId = 'momo' | 'bank' | 'vnpay' | 'card';

export function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    planId?: string;
    cycle?: BillingCycle;
    paymentMethod?: PaymentMethodId;
  }>();

  const { theme, isDark } = useTheme();

  // Selected plan state
  const initialPlan =
    VIP_PLANS.find((p) => p.id === params.planId) ||
    VIP_PLANS.find((p) => p.isPopular) ||
    VIP_PLANS[1];

  const [selectedPlan, setSelectedPlan] = useState<Plan>(initialPlan);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    params.cycle === 'yearly' ? 'yearly' : 'monthly'
  );
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>(
    (params.paymentMethod as PaymentMethodId) || 'momo'
  );

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8890 1234 5678');
  const [cardHolder, setCardHolder] = useState('NGUYEN VAN A');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Copied toast state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Processing & Success Modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  // Countdown timer for QR code (15:00)
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pricing calculations
  const originalMonthlyPrice = selectedPlan.price;
  const rawSubtotal =
    billingCycle === 'yearly'
      ? Math.round(originalMonthlyPrice * 12 * 0.8)
      : originalMonthlyPrice;

  const cycleDiscount =
    billingCycle === 'yearly' ? Math.round(originalMonthlyPrice * 12 * 0.2) : 0;

  const finalPrice = rawSubtotal;

  const handleCopyText = (text: string, fieldKey: string) => {
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate secure payment gateway transaction
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccessModalVisible(true);
    }, 1200);
  };

  const paymentMethods = [
    {
      id: 'momo' as PaymentMethodId,
      name: 'Ví MoMo',
      subtitle: 'Quét mã MoMo QR tức thì',
      icon: QrCode,
      color: '#A50064',
      badge: 'Khuyên dùng',
    },
    {
      id: 'bank' as PaymentMethodId,
      name: 'Chuyển khoản VietQR',
      subtitle: 'Mọi ứng dụng ngân hàng 24/7',
      icon: Zap,
      color: '#0052CC',
      badge: 'Phổ biến',
    },
    {
      id: 'vnpay' as PaymentMethodId,
      name: 'VNPAY-QR',
      subtitle: 'Cổng thanh toán quốc gia',
      icon: QrCode,
      color: '#ED1C24',
    },
    {
      id: 'card' as PaymentMethodId,
      name: 'Thẻ Quốc Tế',
      subtitle: 'Visa, Mastercard, JCB',
      icon: CreditCard,
      color: '#F59E0B',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.push('/vip' as any);
          }}
          style={[styles.backBtn, { borderColor: theme.border }]}
          accessibilityLabel="Quay lại"
        >
          <ArrowLeft size={20} color={theme.text} />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Thanh Toán Gói Cước
          </Text>
          <View style={styles.secureHeaderBadge}>
            <Lock size={11} color="#10B981" />
            <Text style={styles.secureHeaderText}>Bảo mật SSL 256-bit</Text>
          </View>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. Order Summary Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !isDark && styles.cardLight,
          ]}
        >
          <View style={styles.planHeaderRow}>
            <View style={styles.planBadgeIcon}>
              <Crown size={20} color="#F59E0B" fill="#F59E0B" />
            </View>
            <View style={styles.planTitleCol}>
              <Text style={[styles.planCardName, { color: theme.text }]}>
                {selectedPlan.name}
              </Text>
              <Text style={styles.planResolution}>{selectedPlan.resolution}</Text>
            </View>

            <View style={styles.devicePill}>
              <Tv size={12} color={StreamHubColors.primary} />
              <Text style={styles.devicePillText}>{selectedPlan.maxDevices} Thiết bị</Text>
            </View>
          </View>

          {/* Billing Cycle Switcher inside Checkout */}
          <View
            style={[
              styles.cycleSwitcher,
              {
                backgroundColor: isDark
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.03)',
                borderColor: theme.border,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setBillingCycle('monthly')}
              style={[
                styles.cycleOption,
                billingCycle === 'monthly' && {
                  backgroundColor: theme.card,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                },
              ]}
            >
              <Text
                style={[
                  styles.cycleOptionText,
                  {
                    color:
                      billingCycle === 'monthly'
                        ? StreamHubColors.primary
                        : theme.textMuted,
                    fontWeight:
                      billingCycle === 'monthly'
                        ? Typography.weight.bold
                        : Typography.weight.medium,
                  },
                ]}
              >
                Gói 1 Tháng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setBillingCycle('yearly')}
              style={[
                styles.cycleOption,
                billingCycle === 'yearly' && {
                  backgroundColor: theme.card,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                },
              ]}
            >
              <Text
                style={[
                  styles.cycleOptionText,
                  {
                    color:
                      billingCycle === 'yearly'
                        ? StreamHubColors.primary
                        : theme.textMuted,
                    fontWeight:
                      billingCycle === 'yearly'
                        ? Typography.weight.bold
                        : Typography.weight.medium,
                  },
                ]}
              >
                Gói 12 Tháng
              </Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Tiết kiệm 20%</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Feature Highlights */}
          <View style={styles.featureChips}>
            {selectedPlan.features.slice(0, 3).map((feat, idx) => (
              <View key={idx} style={styles.featureChip}>
                <Check size={11} color="#10B981" strokeWidth={3} />
                <Text style={[styles.featureChipText, { color: theme.textMuted }]}>
                  {feat}
                </Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Price Breakdown */}
          <View style={styles.breakdownList}>
            <View style={styles.breakdownRow}>
              <Text style={[styles.breakdownLabel, { color: theme.textMuted }]}>
                Đơn giá gói ({billingCycle === 'yearly' ? '12 tháng' : '1 tháng'})
              </Text>
              <Text style={[styles.breakdownValue, { color: theme.text }]}>
                {(billingCycle === 'yearly'
                  ? originalMonthlyPrice * 12
                  : originalMonthlyPrice
                ).toLocaleString('vi-VN')}
                đ
              </Text>
            </View>

            {billingCycle === 'yearly' && (
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: '#10B981' }]}>
                  Ưu đãi thanh toán năm (-20%)
                </Text>
                <Text style={[styles.breakdownValue, { color: '#10B981' }]}>
                  -{cycleDiscount.toLocaleString('vi-VN')}đ
                </Text>
              </View>
            )}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.totalRow}>
              <View>
                <Text style={[styles.totalLabel, { color: theme.text }]}>
                  Tổng thanh toán
                </Text>
                <Text style={[styles.totalSub, { color: theme.textMuted }]}>
                  Đã bao gồm thuế VAT
                </Text>
              </View>
              <Text style={styles.totalAmount}>
                {finalPrice.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Payment Methods List (Dạng danh sách các thẻ hàng ngang) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Phương Thức Thanh Toán
          </Text>
        </View>

        <View style={styles.paymentMethodsVerticalList}>
          {paymentMethods.map((pm) => {
            const isSelected = selectedPayment === pm.id;
            const IconComp = pm.icon;

            return (
              <TouchableOpacity
                key={pm.id}
                activeOpacity={0.85}
                onPress={() => setSelectedPayment(pm.id)}
                style={[
                  styles.paymentRowCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: isSelected
                      ? StreamHubColors.primary
                      : theme.border,
                  },
                  isSelected && styles.paymentRowCardSelected,
                  !isDark && styles.cardLight,
                ]}
              >
                <View
                  style={[
                    styles.pmIconBox,
                    { backgroundColor: `${pm.color}18` },
                  ]}
                >
                  <IconComp size={22} color={pm.color} />
                </View>

                <View style={styles.pmDetailsCol}>
                  <View style={styles.pmNameBadgeRow}>
                    <Text
                      style={[
                        styles.pmName,
                        {
                          color: isSelected
                            ? StreamHubColors.primary
                            : theme.text,
                        },
                      ]}
                    >
                      {pm.name}
                    </Text>
                    {pm.badge && (
                      <View style={styles.pmBadge}>
                        <Text style={styles.pmBadgeText}>{pm.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.pmSubtitle, { color: theme.textMuted }]}>
                    {pm.subtitle}
                  </Text>
                </View>

                <View
                  style={[
                    styles.radioCircle,
                    isSelected
                      ? {
                          backgroundColor: StreamHubColors.primary,
                          borderColor: StreamHubColors.primary,
                        }
                      : { borderColor: theme.border },
                  ]}
                >
                  {isSelected ? (
                    <View style={styles.radioInnerDot} />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. Detailed Payment Gateway Box (Interactive QR or Card Form) */}
        {selectedPayment === 'momo' && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && styles.cardLight,
            ]}
          >
            <View style={styles.qrHeaderRow}>
              <View style={styles.qrHeaderInfo}>
                <Text style={[styles.qrTitle, { color: theme.text }]}>
                  Quét Mã MoMo QR Để Thanh Toán
                </Text>
                <Text style={[styles.qrSub, { color: theme.textMuted }]}>
                  Mở ứng dụng MoMo và quét mã bên dưới
                </Text>
              </View>
              <View style={styles.countdownBadge}>
                <Clock size={12} color="#F59E0B" />
                <Text style={styles.countdownText}>{formatTimer(timeLeft)}</Text>
              </View>
            </View>

            {/* Simulated MoMo QR Display */}
            <View style={styles.qrContainer}>
              <View style={styles.qrBox}>
                <View style={styles.mockQrPattern}>
                  <QrCode size={160} color="#A50064" />
                </View>
                <View style={styles.qrBrandTag}>
                  <Text style={styles.qrBrandText}>MOMO QR</Text>
                </View>
              </View>

              <View style={styles.qrInstructionsBox}>
                <View style={styles.qrStepRow}>
                  <Text style={styles.stepNum}>1</Text>
                  <Text style={[styles.stepDesc, { color: theme.text }]}>
                    Mở ứng dụng MoMo trên điện thoại
                  </Text>
                </View>
                <View style={styles.qrStepRow}>
                  <Text style={styles.stepNum}>2</Text>
                  <Text style={[styles.stepDesc, { color: theme.text }]}>
                    Chọn "Quét Mã" và hướng camera vào mã QR
                  </Text>
                </View>
                <View style={styles.qrStepRow}>
                  <Text style={styles.stepNum}>3</Text>
                  <Text style={[styles.stepDesc, { color: theme.text }]}>
                    Kiểm tra số tiền {finalPrice.toLocaleString('vi-VN')}đ và bấm xác nhận
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {selectedPayment === 'bank' && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && styles.cardLight,
            ]}
          >
            <View style={styles.qrHeaderRow}>
              <View style={styles.qrHeaderInfo}>
                <Text style={[styles.qrTitle, { color: theme.text }]}>
                  Chuyển Khoản Ngân Hàng VietQR 24/7
                </Text>
                <Text style={[styles.qrSub, { color: theme.textMuted }]}>
                  Hỗ trợ quét QR trên tất cả ứng dụng ngân hàng tại VN
                </Text>
              </View>
              <View style={styles.countdownBadge}>
                <Clock size={12} color="#F59E0B" />
                <Text style={styles.countdownText}>{formatTimer(timeLeft)}</Text>
              </View>
            </View>

            {/* Bank Transfer Details with Copy Buttons */}
            <View style={styles.bankDetailsContainer}>
              <View
                style={[
                  styles.bankInfoItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' },
                ]}
              >
                <View>
                  <Text style={[styles.bankInfoLabel, { color: theme.textMuted }]}>
                    Ngân hàng thụ hưởng
                  </Text>
                  <Text style={[styles.bankInfoValue, { color: theme.text }]}>
                    MB Bank (Ngân Hàng Quân Đội)
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.bankInfoItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' },
                ]}
              >
                <View>
                  <Text style={[styles.bankInfoLabel, { color: theme.textMuted }]}>
                    Số tài khoản
                  </Text>
                  <Text style={[styles.bankInfoValue, { color: StreamHubColors.primary }]}>
                    0988 888 6688
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleCopyText('09888886688', 'stk')}
                  style={[styles.copyBtn, { borderColor: theme.border }]}
                >
                  {copiedField === 'stk' ? (
                    <Check size={14} color="#10B981" />
                  ) : (
                    <Copy size={14} color={theme.text} />
                  )}
                  <Text style={[styles.copyBtnText, { color: theme.text }]}>
                    {copiedField === 'stk' ? 'Đã sao chép' : 'Sao chép'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.bankInfoItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' },
                ]}
              >
                <View>
                  <Text style={[styles.bankInfoLabel, { color: theme.textMuted }]}>
                    Chủ tài khoản
                  </Text>
                  <Text style={[styles.bankInfoValue, { color: theme.text }]}>
                    CONG TY CO PHAN STREAMHUB VIET NAM
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.bankInfoItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' },
                ]}
              >
                <View>
                  <Text style={[styles.bankInfoLabel, { color: theme.textMuted }]}>
                    Số tiền cần chuyển
                  </Text>
                  <Text style={[styles.bankInfoValue, { color: StreamHubColors.primary, fontWeight: '700' }]}>
                    {finalPrice.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleCopyText(`${finalPrice}`, 'amount')}
                  style={[styles.copyBtn, { borderColor: theme.border }]}
                >
                  {copiedField === 'amount' ? (
                    <Check size={14} color="#10B981" />
                  ) : (
                    <Copy size={14} color={theme.text} />
                  )}
                  <Text style={[styles.copyBtnText, { color: theme.text }]}>
                    {copiedField === 'amount' ? 'Đã sao chép' : 'Sao chép'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.bankInfoItem,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC' },
                ]}
              >
                <View>
                  <Text style={[styles.bankInfoLabel, { color: theme.textMuted }]}>
                    Nội dung chuyển khoản
                  </Text>
                  <Text style={[styles.bankInfoValue, { color: '#F59E0B', fontWeight: '700' }]}>
                    SHVIP {selectedPlan.id.toUpperCase().replace('-', '')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    handleCopyText(
                      `SHVIP ${selectedPlan.id.toUpperCase().replace('-', '')}`,
                      'content'
                    )
                  }
                  style={[styles.copyBtn, { borderColor: theme.border }]}
                >
                  {copiedField === 'content' ? (
                    <Check size={14} color="#10B981" />
                  ) : (
                    <Copy size={14} color={theme.text} />
                  )}
                  <Text style={[styles.copyBtnText, { color: theme.text }]}>
                    {copiedField === 'content' ? 'Đã sao chép' : 'Sao chép'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {selectedPayment === 'card' && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && styles.cardLight,
            ]}
          >
            <View style={styles.cardHeaderBox}>
              <Text style={[styles.qrTitle, { color: theme.text }]}>
                Thông Tin Thẻ Quốc Tế
              </Text>
              <View style={styles.cardBrandsRow}>
                <Text style={styles.brandVisa}>VISA</Text>
                <Text style={styles.brandMc}>Mastercard</Text>
                <Text style={styles.brandJcb}>JCB</Text>
              </View>
            </View>

            {/* Live Virtual Credit Card Preview */}
            <View style={styles.virtualCard}>
              <View style={styles.virtualCardTop}>
                <Sparkles size={18} color="#F59E0B" />
                <Text style={styles.virtualCardChip}>CREDIT</Text>
              </View>

              <Text style={styles.virtualCardNumber}>
                {cardNumber || '•••• •••• •••• ••••'}
              </Text>

              <View style={styles.virtualCardBottom}>
                <View>
                  <Text style={styles.virtualCardLabel}>CHỦ THẺ</Text>
                  <Text style={styles.virtualCardHolder}>
                    {cardHolder || 'HO VA TEN'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.virtualCardLabel}>HẾT HẠN</Text>
                  <Text style={styles.virtualCardExpiry}>
                    {cardExpiry || 'MM/YY'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Card Inputs */}
            <View style={styles.cardInputsList}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                  Số thẻ
                </Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="4532 8890 1234 5678"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="number-pad"
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(0, 0, 0, 0.04)',
                      borderColor: theme.border,
                      color: theme.text,
                    },
                  ]}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                  Tên in trên thẻ (không dấu)
                </Text>
                <TextInput
                  value={cardHolder}
                  onChangeText={(val) => setCardHolder(val.toUpperCase())}
                  placeholder="NGUYEN VAN A"
                  placeholderTextColor={theme.textMuted}
                  autoCapitalize="characters"
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(0, 0, 0, 0.04)',
                      borderColor: theme.border,
                      color: theme.text,
                    },
                  ]}
                />
              </View>

              <View style={styles.inputRowDouble}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    Hạn dùng (MM/YY)
                  </Text>
                  <TextInput
                    value={cardExpiry}
                    onChangeText={setCardExpiry}
                    placeholder="12/28"
                    placeholderTextColor={theme.textMuted}
                    style={[
                      styles.textInput,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(0, 0, 0, 0.04)',
                        borderColor: theme.border,
                        color: theme.text,
                      },
                    ]}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    CVV / CVC
                  </Text>
                  <TextInput
                    value={cardCvv}
                    onChangeText={setCardCvv}
                    placeholder="888"
                    placeholderTextColor={theme.textMuted}
                    secureTextEntry
                    keyboardType="number-pad"
                    maxLength={4}
                    style={[
                      styles.textInput,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(0, 0, 0, 0.04)',
                        borderColor: theme.border,
                        color: theme.text,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {selectedPayment === 'vnpay' && (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && styles.cardLight,
            ]}
          >
            <View style={styles.vnpayBox}>
              <View style={styles.vnpayLogoRow}>
                <Text style={styles.vnpayBrand}>VNPAY-QR</Text>
                <Text style={[styles.vnpayDesc, { color: theme.textMuted }]}>
                  Kết nối 40+ ứng dụng ngân hàng và ví điện tử
                </Text>
              </View>

              <View style={styles.qrBox}>
                <QrCode size={150} color="#ED1C24" />
              </View>
              <Text style={[styles.vnpayNote, { color: theme.textMuted }]}>
                Mở ứng dụng ngân hàng hoặc ví VNPAY của bạn để quét mã thanh toán {finalPrice.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          </View>
        )}

        {/* 5. Security Guarantees & Policy */}
        <View style={styles.guaranteeContainer}>
          <View style={styles.guaranteeItem}>
            <ShieldCheck size={18} color="#10B981" />
            <Text style={[styles.guaranteeText, { color: theme.textMuted }]}>
              Bảo mật tiêu chuẩn quốc tế PCI-DSS & mã hóa 256-bit SSL
            </Text>
          </View>
          <View style={styles.guaranteeItem}>
            <CheckCircle2 size={18} color="#10B981" />
            <Text style={[styles.guaranteeText, { color: theme.textMuted }]}>
              Kích hoạt gói VIP tự động ngay sau khi thanh toán thành công
            </Text>
          </View>
          <View style={styles.guaranteeItem}>
            <Info size={18} color={theme.textMuted} />
            <Text style={[styles.guaranteeText, { color: theme.textMuted }]}>
              Hỗ trợ hoàn tiền trong 7 ngày nếu không hài lòng dịch vụ
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* 6. Fixed Bottom Checkout CTA Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: isDark ? '#050816' : '#FFFFFF',
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.bottomPriceBox}>
          <Text style={[styles.bottomLabel, { color: theme.textMuted }]}>
            Tổng thanh toán:
          </Text>
          <Text style={styles.bottomPriceVal}>
            {finalPrice.toLocaleString('vi-VN')}đ
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleConfirmPayment}
          disabled={isProcessing}
          style={[styles.payNowBtn, isProcessing && { opacity: 0.8 }]}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Lock size={16} color="#FFFFFF" />
              <Text style={styles.payNowBtnText}>Xác Nhận Thanh Toán</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* 7. Success Modal */}
      <Modal
        visible={isSuccessModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.successModalCard,
              {
                backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                borderColor: theme.border,
              },
            ]}
          >
            {/* Crown & Success Animation Icon */}
            <View style={styles.successIconOuter}>
              <View style={styles.successIconInner}>
                <Crown size={36} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            </View>

            <Text style={[styles.successTitle, { color: theme.text }]}>
              Thanh Toán Thành Công! 🎉
            </Text>

            <Text style={[styles.successSub, { color: theme.textMuted }]}>
              Chúc mừng bạn đã nâng cấp thành công gói{' '}
              <Text style={{ color: StreamHubColors.primary, fontWeight: '700' }}>
                {selectedPlan.name}
              </Text>
              . Toàn bộ kho phim bom tấn 4K HDR đã sẵn sàng!
            </Text>

            {/* Receipt Summary */}
            <View
              style={[
                styles.receiptBox,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : '#F8FAFC',
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.receiptRow}>
                <Text style={[styles.receiptLabel, { color: theme.textMuted }]}>
                  Mã giao dịch:
                </Text>
                <Text style={[styles.receiptValue, { color: theme.text }]}>
                  SH-20268892
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={[styles.receiptLabel, { color: theme.textMuted }]}>
                  Phương thức:
                </Text>
                <Text style={[styles.receiptValue, { color: theme.text }]}>
                  {paymentMethods.find((p) => p.id === selectedPayment)?.name}
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={[styles.receiptLabel, { color: theme.textMuted }]}>
                  Số tiền thanh toán:
                </Text>
                <Text
                  style={[
                    styles.receiptValue,
                    { color: StreamHubColors.primary, fontWeight: '700' },
                  ]}
                >
                  {finalPrice.toLocaleString('vi-VN')}đ
                </Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={[styles.receiptLabel, { color: theme.textMuted }]}>
                  Thời hạn VIP:
                </Text>
                <Text style={[styles.receiptValue, { color: '#10B981', fontWeight: '700' }]}>
                  {billingCycle === 'yearly' ? '12 tháng (đến 29/10/2027)' : '1 tháng (đến 29/11/2026)'}
                </Text>
              </View>
            </View>

            {/* Button Return Home */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => {
                setIsSuccessModalVisible(false);
                router.push('/');
              }}
              style={styles.exploreNowBtn}
            >
              <Sparkles size={18} color="#FFFFFF" />
              <Text style={styles.exploreNowBtnText}>Bắt Đầu Xem Phim Ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === 'ios' ? 48 : 20,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: Typography.weight.bold,
  },
  secureHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  secureHeaderText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: Typography.weight.medium,
  },

  /* Scroll Content */
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 120,
    gap: Spacing.md,
  },

  /* Card */
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  cardLight: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  /* Plan Details Card */
  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planBadgeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitleCol: {
    flex: 1,
  },
  planCardName: {
    fontSize: 17,
    fontWeight: Typography.weight.bold,
  },
  planResolution: {
    fontSize: 12,
    color: StreamHubColors.primary,
    fontWeight: Typography.weight.semibold,
  },
  devicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
  },
  devicePillText: {
    fontSize: 11,
    color: StreamHubColors.primary,
    fontWeight: Typography.weight.medium,
  },

  /* Cycle Switcher inside checkout */
  cycleSwitcher: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginTop: 4,
  },
  cycleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
  },
  cycleOptionText: {
    fontSize: 13,
  },
  saveBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  saveBadgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: Typography.weight.bold,
  },

  /* Feature chips */
  featureChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  featureChipText: {
    fontSize: 11,
  },

  divider: {
    height: 1,
    marginVertical: 4,
  },

  /* Price Breakdown */
  breakdownList: {
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 13,
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: Typography.weight.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: Typography.weight.bold,
  },
  totalSub: {
    fontSize: 11,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: Typography.weight.bold,
    color: StreamHubColors.primary,
  },

  /* Section Header */
  sectionHeaderRow: {
    marginTop: 6,
    gap: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: Typography.weight.bold,
  },
  sectionSubtitle: {
    fontSize: 11,
  },

  /* Payment Methods Vertical List with Horizontal Row Cards */
  paymentMethodsVerticalList: {
    gap: 10,
  },
  paymentRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  paymentRowCardSelected: {
    borderColor: StreamHubColors.primary,
    backgroundColor: 'rgba(249, 115, 22, 0.05)',
  },
  pmIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pmDetailsCol: {
    flex: 1,
    gap: 3,
  },
  pmNameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pmName: {
    fontSize: 14,
    fontWeight: Typography.weight.bold,
  },
  pmBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  pmBadgeText: {
    fontSize: 9,
    color: '#000000',
    fontWeight: Typography.weight.bold,
  },
  pmSubtitle: {
    fontSize: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  /* QR Code Box */
  qrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  qrHeaderInfo: {
    flex: 1,
    gap: 2,
  },
  qrTitle: {
    fontSize: 14,
    fontWeight: Typography.weight.bold,
  },
  qrSub: {
    fontSize: 12,
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  countdownText: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: Typography.weight.bold,
  },
  qrContainer: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  qrBox: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  mockQrPattern: {
    padding: 6,
  },
  qrBrandTag: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#A50064',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  qrBrandText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  qrInstructionsBox: {
    width: '100%',
    gap: 8,
    marginTop: 6,
  },
  qrStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: StreamHubColors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 11,
    fontWeight: Typography.weight.bold,
  },
  stepDesc: {
    fontSize: 12,
    flex: 1,
  },

  /* Bank Details */
  bankDetailsContainer: {
    gap: 8,
    marginTop: 4,
  },
  bankInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: BorderRadius.md,
  },
  bankInfoLabel: {
    fontSize: 11,
  },
  bankInfoValue: {
    fontSize: 13,
    fontWeight: Typography.weight.bold,
    marginTop: 2,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: Typography.weight.medium,
  },

  /* Card Inputs */
  cardHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBrandsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  brandVisa: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1A1F71',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  brandMc: {
    fontSize: 11,
    fontWeight: '900',
    color: '#EB001B',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  brandJcb: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0054A6',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  virtualCard: {
    height: 150,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#1E293B',
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  virtualCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  virtualCardChip: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    letterSpacing: 1,
  },
  virtualCardNumber: {
    color: '#FFFFFF',
    fontSize: 17,
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: Typography.weight.bold,
  },
  virtualCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  virtualCardLabel: {
    color: '#94A3B8',
    fontSize: 9,
    letterSpacing: 0.5,
  },
  virtualCardHolder: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: Typography.weight.bold,
  },
  virtualCardExpiry: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: Typography.weight.bold,
  },
  cardInputsList: {
    gap: 10,
    marginTop: 6,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 12,
  },
  textInput: {
    height: 42,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  inputRowDouble: {
    flexDirection: 'row',
    gap: 10,
  },

  /* VNPAY Box */
  vnpayBox: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  vnpayLogoRow: {
    alignItems: 'center',
    gap: 2,
  },
  vnpayBrand: {
    fontSize: 18,
    fontWeight: Typography.weight.heavy,
    color: '#ED1C24',
    letterSpacing: 1,
  },
  vnpayDesc: {
    fontSize: 12,
  },
  vnpayNote: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  /* Guarantees */
  guaranteeContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guaranteeText: {
    fontSize: 12,
    flex: 1,
  },

  /* Fixed Bottom Bar */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : Spacing.md,
    borderTopWidth: 1,
  },
  bottomPriceBox: {
    gap: 1,
  },
  bottomLabel: {
    fontSize: 11,
  },
  bottomPriceVal: {
    fontSize: 20,
    fontWeight: Typography.weight.bold,
    color: StreamHubColors.primary,
  },
  payNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 20,
    height: 46,
    borderRadius: BorderRadius.md,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  payNowBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: Typography.weight.bold,
  },

  /* Success Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  successModalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: Typography.weight.bold,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 8,
  },
  receiptBox: {
    width: '100%',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 12,
  },
  receiptValue: {
    fontSize: 12,
    fontWeight: Typography.weight.medium,
  },
  exploreNowBtn: {
    width: '100%',
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: StreamHubColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  exploreNowBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: Typography.weight.bold,
  },
});
