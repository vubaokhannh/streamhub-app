import { FAQ_LIST, VIP_PLANS } from '@/constants/mockData';
import { BorderRadius, Spacing, StreamHubColors, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks';
import { MainLayout } from '@/layouts';
import { Plan } from '@/types';
import { useRouter } from 'expo-router';
import {
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Crown,
  QrCode,
  ShieldCheck,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type BillingCycle = 'monthly' | 'yearly';
type PaymentMethodId = 'momo' | 'vnpay' | 'card' | 'bank';

interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  desc: string;
  icon: typeof CreditCard;
  badge?: string;
}

export function SubscriptionScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    VIP_PLANS.find((p) => p.isPopular)?.id || VIP_PLANS[1].id
  );
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('momo');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'momo',
      name: 'Ví MoMo',
      desc: 'Quét mã QR thanh toán tức thì',
      icon: QrCode,
      badge: 'Khuyên dùng',
    },
    {
      id: 'bank',
      name: 'Chuyển khoản VietQR',
      desc: 'Mọi ứng dụng ngân hàng tại Việt Nam',
      icon: Zap,
    },
    {
      id: 'vnpay',
      name: 'VNPAY-QR',
      desc: 'Cổng thanh toán quốc gia',
      icon: QrCode,
    },
    {
      id: 'card',
      name: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
      desc: 'Tự động gia hạn an toàn',
      icon: CreditCard,
    },
  ];

  const selectedPlan = VIP_PLANS.find((p) => p.id === selectedPlanId) || VIP_PLANS[1];

  // Calculate price based on billing cycle (Yearly gets 20% discount)
  const getPlanPrice = (plan: Plan) => {
    if (billingCycle === 'yearly') {
      return Math.round((plan.price * 12 * 0.8) / 12);
    }
    return plan.price;
  };

  const getPlanTotalPrice = (plan: Plan) => {
    if (billingCycle === 'yearly') {
      return Math.round(plan.price * 12 * 0.8);
    }
    return plan.price;
  };

  const handleSubscribe = () => {
    router.push({
      pathname: '/checkout' as any,
      params: {
        planId: selectedPlan.id,
        cycle: billingCycle,
        paymentMethod: selectedPayment,
      },
    });
  };

  return (
    <MainLayout
      activeTab="vip"
      onTabChange={(tab) => {
        if (tab === 'home') router.push('/');
        else if (tab === 'explore') router.push('/explore' as any);
        else if (tab === 'profile') router.push('/profile');
      }}
      headerProps={{
        title: 'Gói Cước VIP',
        showLogo: false,
        showBackButton: true,
        onBackPress: () => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push('/');
          }
        },
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================================================= */}
        {/* 1. COMPACT TOP HEADER                                                     */}
        {/* ========================================================================= */}
        <View style={styles.topHeaderSection}>
          <View style={styles.headerTitleRow}>
            {/* <Sparkles size={20} color="#F59E0B" fill="#F59E0B" /> */}
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Chọn Gói Cước Của Bạn
            </Text>
          </View>
          <Text style={[styles.headerSub, { color: theme.textMuted }]}>
            Thưởng thức trọn vẹn kho phim bom tấn 4K HDR • Hủy bất kỳ lúc nào
          </Text>
        </View>

        {/* ========================================================================= */}
        {/* 2. BILLING CYCLE TOGGLE (Theo Tháng vs Theo Năm)                          */}
        {/* ========================================================================= */}
        <View style={styles.billingSection}>
          <View
            style={[
              styles.cycleToggleContainer,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                borderColor: theme.border,
              },
            ]}
          >
            {/* Monthly Option */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setBillingCycle('monthly')}
              style={[
                styles.cycleTab,
                billingCycle === 'monthly' && {
                  backgroundColor: theme.card,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
            >
              <Text
                style={[
                  styles.cycleTabText,
                  {
                    color:
                      billingCycle === 'monthly'
                        ? theme.text
                        : theme.textMuted,
                    fontWeight:
                      billingCycle === 'monthly'
                        ? Typography.weight.bold
                        : Typography.weight.medium,
                  },
                ]}
              >
                Gói Hàng Tháng
              </Text>
            </TouchableOpacity>

            {/* Yearly Option */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setBillingCycle('yearly')}
              style={[
                styles.cycleTab,
                billingCycle === 'yearly' && {
                  backgroundColor: theme.card,
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
            >
              <Text
                style={[
                  styles.cycleTabText,
                  {
                    color:
                      billingCycle === 'yearly'
                        ? theme.text
                        : theme.textMuted,
                    fontWeight:
                      billingCycle === 'yearly'
                        ? Typography.weight.bold
                        : Typography.weight.medium,
                  },
                ]}
              >
                Theo Năm
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>-20%</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================================================= */}
        {/* 3. SUBSCRIPTION PLAN CARDS                                                */}
        {/* ========================================================================= */}
        <View style={styles.plansList}>
          {VIP_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const monthlyPrice = getPlanPrice(plan);

            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.85}
                onPress={() => setSelectedPlanId(plan.id)}
                style={[
                  styles.planCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: isSelected
                      ? StreamHubColors.primary
                      : theme.border,
                  },
                  isSelected && styles.planCardSelected,
                  !isDark && styles.cardLight,
                ]}
              >
                {/* Popular / VIP Ribbon Badge */}
                {plan.isPopular ? (
                  <View style={styles.popularBadge}>
                    <Sparkles size={10} color="#FFFFFF" />
                    <Text style={styles.popularBadgeText}>PHỔ BIẾN NHẤT</Text>
                  </View>
                ) : plan.isVip ? (
                  <View style={styles.vipTierBadge}>
                    <Crown size={10} color="#000000" fill="#000000" />
                    <Text style={styles.vipTierBadgeText}>ĐẲNG CẤP NHẤT</Text>
                  </View>
                ) : null}

                {/* Card Header & Price */}
                <View style={styles.planCardHeader}>
                  <View style={styles.planInfoCol}>
                    <Text style={[styles.planName, { color: theme.text }]}>
                      {plan.name}
                    </Text>
                    <Text style={[styles.planResolution, { color: StreamHubColors.primary }]}>
                      {plan.resolution}
                    </Text>
                  </View>

                  {/* Radio Check Circle */}
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
                    {isSelected ? <Check size={13} color="#FFFFFF" strokeWidth={3} /> : null}
                  </View>
                </View>

                {/* Price Display */}
                <View style={styles.priceRow}>
                  <Text style={[styles.priceAmount, { color: theme.text }]}>
                    {monthlyPrice.toLocaleString('vi-VN')}đ
                  </Text>
                  <Text style={[styles.priceUnit, { color: theme.textMuted }]}>
                    / tháng
                  </Text>
                  {billingCycle === 'yearly' && (
                    <Text style={styles.yearlySavingsNote}>
                      (Thanh toán {(monthlyPrice * 12).toLocaleString('vi-VN')}đ/năm)
                    </Text>
                  )}
                </View>

                {/* Divider */}
                <View style={[styles.cardDivider, { backgroundColor: theme.border }]} />

                {/* Feature Bullet Points */}
                <View style={styles.featuresList}>
                  {plan.features.map((feature, fIdx) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <View style={styles.checkIconBox}>
                        <Check size={12} color="#10B981" strokeWidth={2.5} />
                      </View>
                      <Text style={[styles.featureText, { color: theme.text }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.featureItem}>
                    <View style={styles.checkIconBox}>
                      <Tv size={12} color={StreamHubColors.primary} />
                    </View>
                    <Text style={[styles.featureText, { color: theme.text }]}>
                      {plan.maxDevices} thiết bị phát cùng lúc
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ========================================================================= */}
        {/* 4. PAYMENT METHOD SELECTION                                               */}
        {/* ========================================================================= */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Phương Thức Thanh Toán
          </Text>
        </View>

        <View
          style={[
            styles.paymentGroup,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !isDark && styles.cardLight,
          ]}
        >
          {paymentMethods.map((pm, pIdx) => {
            const isChosen = selectedPayment === pm.id;
            const isLast = pIdx === paymentMethods.length - 1;
            const IconComp = pm.icon;

            return (
              <View key={pm.id}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedPayment(pm.id)}
                  style={styles.paymentRow}
                >
                  <View
                    style={[
                      styles.pmIconCircle,
                      {
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'rgba(0, 0, 0, 0.04)',
                      },
                    ]}
                  >
                    <IconComp size={18} color={StreamHubColors.primary} />
                  </View>

                  <View style={styles.pmDetails}>
                    <View style={styles.pmTitleRow}>
                      <Text style={[styles.pmName, { color: theme.text }]}>
                        {pm.name}
                      </Text>
                      {pm.badge ? (
                        <View style={styles.pmBadge}>
                          <Text style={styles.pmBadgeText}>{pm.badge}</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={[styles.pmDesc, { color: theme.textMuted }]}>
                      {pm.desc}
                    </Text>
                  </View>

                  {/* Radio Button */}
                  <View
                    style={[
                      styles.radioCircleSmall,
                      isChosen
                        ? {
                          backgroundColor: StreamHubColors.primary,
                          borderColor: StreamHubColors.primary,
                        }
                        : { borderColor: theme.border },
                    ]}
                  >
                    {isChosen ? (
                      <View style={styles.radioDot} />
                    ) : null}
                  </View>
                </TouchableOpacity>

                {!isLast && (
                  <View
                    style={[styles.paymentDivider, { backgroundColor: theme.border }]}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* ========================================================================= */}
        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ)                                       */}
        {/* ========================================================================= */}
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Câu Hỏi Thường Gặp
          </Text>
        </View>

        <View
          style={[
            styles.faqGroup,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !isDark && styles.cardLight,
          ]}
        >
          {FAQ_LIST.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            const isLast = index === FAQ_LIST.length - 1;

            return (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setExpandedFaq(isExpanded ? null : index)}
                  style={styles.faqHeader}
                >
                  <Text style={[styles.faqQuestion, { color: theme.text }]}>
                    {faq.question}
                  </Text>
                  {isExpanded ? (
                    <ChevronUp size={18} color={theme.textMuted} />
                  ) : (
                    <ChevronDown size={18} color={theme.textMuted} />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.faqBody}>
                    <Text style={[styles.faqAnswer, { color: theme.textMuted }]}>
                      {faq.answer}
                    </Text>
                  </View>
                )}

                {!isLast && (
                  <View
                    style={[styles.faqDivider, { backgroundColor: theme.border }]}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Security badge at bottom */}
        <View style={styles.securityRow}>
          <ShieldCheck size={16} color="#10B981" />
          <Text style={[styles.securityText, { color: theme.textMuted }]}>
            Bảo mật thanh toán 256-bit SSL • Có thể hủy gia hạn bất kỳ lúc nào
          </Text>
        </View>
      </ScrollView>

      {/* ========================================================================= */}
      {/* 6. FIXED BOTTOM CHECKOUT CTA BAR                                          */}
      {/* ========================================================================= */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: isDark
              ? 'rgba(5, 8, 22, 0.96)'
              : 'rgba(255, 255, 255, 0.98)',
            borderTopColor: theme.border,
          },
        ]}
      >
        <View style={styles.bottomBarInfo}>
          <Text style={[styles.bottomPlanLabel, { color: theme.textMuted }]}>
            {selectedPlan.name} ({billingCycle === 'yearly' ? 'Theo năm' : '1 tháng'})
          </Text>
          <View style={styles.bottomPriceRow}>
            <Text style={[styles.bottomPriceAmount, { color: theme.text }]}>
              {getPlanTotalPrice(selectedPlan).toLocaleString('vi-VN')}đ
            </Text>
            <Text style={[styles.bottomPriceUnit, { color: theme.textMuted }]}>
              {billingCycle === 'yearly' ? '/năm' : '/tháng'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleSubscribe}
          style={styles.subscribeBtn}
        >
          <Sparkles size={16} color="#FFFFFF" />
          <Text style={styles.subscribeBtnText}>Đăng Ký Ngay</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 110,
    gap: Spacing.md,
  },
  cardLight: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  /* ---------------- TOP HEADER ---------------- */
  topHeaderSection: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    alignItems: 'center',
    gap: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: Typography.size.xs,
    textAlign: 'center',
  },
  /* ---------------- BILLING SECTION ---------------- */
  billingSection: {
    alignItems: 'center',
  },
  cycleToggleContainer: {
    flexDirection: 'row',
    borderRadius: BorderRadius.full,
    padding: 4,
    borderWidth: 1,
    width: '100%',
    maxWidth: 340,
  },
  cycleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  cycleTabText: {
    fontSize: Typography.size.xs + 1,
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
  },
  /* ---------------- PLAN CARDS ---------------- */
  plansList: {
    gap: Spacing.md,
  },
  planCard: {
    borderRadius: BorderRadius.lg + 2,
    borderWidth: 1.5,
    padding: Spacing.md + 2,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: BorderRadius.md,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.5,
  },
  vipTierBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: BorderRadius.md,
  },
  vipTierBadgeText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.5,
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  planInfoCol: {
    gap: 2,
  },
  planName: {
    fontSize: Typography.size.md + 1,
    fontWeight: Typography.weight.heavy,
  },
  planResolution: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    gap: 4,
    flexWrap: 'wrap',
  },
  priceAmount: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.heavy,
  },
  priceUnit: {
    fontSize: Typography.size.xs,
  },
  yearlySavingsNote: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: Typography.weight.medium,
  },
  cardDivider: {
    height: 1,
    marginVertical: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIconBox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  featureText: {
    fontSize: Typography.size.xs,
    lineHeight: 18,
  },
  /* ---------------- SECTION TITLE ---------------- */
  sectionTitleRow: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: Typography.size.sm + 1,
    fontWeight: Typography.weight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  /* ---------------- PAYMENT SECTION ---------------- */
  paymentGroup: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: 12,
  },
  pmIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pmDetails: {
    flex: 1,
    gap: 2,
  },
  pmTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pmName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  pmBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pmBadgeText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  pmDesc: {
    fontSize: 11,
  },
  radioCircleSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  paymentDivider: {
    height: 1,
    marginLeft: 64,
  },
  /* ---------------- FAQ ACCORDION ---------------- */
  faqGroup: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    gap: 10,
  },
  faqQuestion: {
    flex: 1,
    fontSize: Typography.size.xs + 1,
    fontWeight: Typography.weight.semibold,
  },
  faqBody: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  faqAnswer: {
    fontSize: Typography.size.xs,
    lineHeight: 20,
  },
  faqDivider: {
    height: 1,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: Spacing.md,
  },
  securityText: {
    fontSize: 11,
    textAlign: 'center',
  },
  /* ---------------- FIXED BOTTOM BAR ---------------- */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  bottomBarInfo: {
    flex: 1,
    gap: 2,
  },
  bottomPlanLabel: {
    fontSize: 11,
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  bottomPriceAmount: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.heavy,
  },
  bottomPriceUnit: {
    fontSize: 11,
  },
  subscribeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
});
