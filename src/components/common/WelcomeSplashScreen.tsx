import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  Easing,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Path,
  G,
  Circle,
  Line,
} from 'react-native-svg';
import {
  useFonts,
  Cinzel_400Regular,
  Cinzel_700Bold,
  Cinzel_900Black,
} from '@expo-google-fonts/cinzel';
import { StreamHubColors } from '@/constants/theme';

interface WelcomeSplashScreenProps {
  onFinish: () => void;
}

// Character data for "WELCOME TO"
const CHARACTERS = [
  { char: 'W', id: 0 },
  { char: 'E', id: 1 },
  { char: 'L', id: 2 },
  { char: 'C', id: 3 },
  { char: 'O', id: 4 },
  { char: 'M', id: 5 },
  { char: 'E', id: 6 },
  { char: ' ', id: 7, isSpace: true },
  { char: 'T', id: 8 },
  { char: 'O', id: 9 },
];

/**
 * 3D Cinema Red Velvet Pleated Curtain Wing
 * Renders realistic velvet tubular drapery with highlights, shadows,
 * gold braided rope edge, and bottom gold fringe.
 */
function VelvetCurtainWing({ isRight = false }: { isRight?: boolean }) {
  // 7 vertical velvet pleats across each half
  const pleats = [0, 1, 2, 3, 4, 5, 6];
  const pleatWidth = 100 / pleats.length; // ~14.28% each

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <Defs>
          {/* Main 3D velvet tubular pleat gradient */}
          <LinearGradient id="velvetPleat" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#1E0305" stopOpacity="1" />
            <Stop offset="20%" stopColor="#4A070B" stopOpacity="1" />
            <Stop offset="48%" stopColor="#A8151D" stopOpacity="1" />
            <Stop offset="55%" stopColor="#D32F2F" stopOpacity="1" />
            <Stop offset="62%" stopColor="#A8151D" stopOpacity="1" />
            <Stop offset="85%" stopColor="#4A070B" stopOpacity="1" />
            <Stop offset="100%" stopColor="#1E0305" stopOpacity="1" />
          </LinearGradient>

          {/* Slightly highlighted velvet pleat for variety */}
          <LinearGradient id="velvetPleatBright" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#250406" stopOpacity="1" />
            <Stop offset="22%" stopColor="#5C090E" stopOpacity="1" />
            <Stop offset="48%" stopColor="#B71C1C" stopOpacity="1" />
            <Stop offset="55%" stopColor="#E53935" stopOpacity="1" />
            <Stop offset="62%" stopColor="#B71C1C" stopOpacity="1" />
            <Stop offset="88%" stopColor="#5C090E" stopOpacity="1" />
            <Stop offset="100%" stopColor="#250406" stopOpacity="1" />
          </LinearGradient>

          {/* Overall top-to-bottom theater ambient shading */}
          <LinearGradient id="velvetVerticalShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#0A0102" stopOpacity="0.75" />
            <Stop offset="15%" stopColor="#000000" stopOpacity="0.1" />
            <Stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <Stop offset="85%" stopColor="#000000" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#0A0102" stopOpacity="0.85" />
          </LinearGradient>

          {/* Gold braided rope trim gradient */}
          <LinearGradient id="goldRopeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#78350F" stopOpacity="1" />
            <Stop offset="25%" stopColor="#D97706" stopOpacity="1" />
            <Stop offset="50%" stopColor="#FEF08A" stopOpacity="1" />
            <Stop offset="75%" stopColor="#F59E0B" stopOpacity="1" />
            <Stop offset="100%" stopColor="#451A03" stopOpacity="1" />
          </LinearGradient>

          {/* Gold bottom fringe gradient */}
          <LinearGradient id="goldFringeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <Stop offset="20%" stopColor="#F59E0B" stopOpacity="1" />
            <Stop offset="75%" stopColor="#D97706" stopOpacity="1" />
            <Stop offset="100%" stopColor="#78350F" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* 1. Base dark stage background behind curtain */}
        <Rect x="0" y="0" width="100" height="1000" fill="#140203" />

        {/* 2. Vertical 3D Velvet Pleats */}
        {pleats.map((pIndex) => {
          const x = pIndex * pleatWidth;
          const isBright = pIndex % 2 === 1;
          return (
            <Rect
              key={pIndex}
              x={x}
              y="0"
              width={pleatWidth + 0.3}
              height="1000"
              fill={isBright ? 'url(#velvetPleatBright)' : 'url(#velvetPleat)'}
            />
          );
        })}

        {/* 3. Top-to-bottom theater vertical vignette shading */}
        <Rect x="0" y="0" width="100" height="1000" fill="url(#velvetVerticalShadow)" />

        {/* 4. Bottom Luxury Gold Fringe Trim */}
        <G>
          {/* Gold braided header band for bottom fringe */}
          <Rect x="0" y="968" width="100" height="6" fill="url(#goldRopeGrad)" />
          {/* Fringe skirt */}
          <Rect x="0" y="974" width="100" height="26" fill="url(#goldFringeGrad)" />
          {/* Fine vertical gold tassel lines */}
          {Array.from({ length: 34 }).map((_, i) => (
            <Line
              key={i}
              x1={i * 3}
              y1="974"
              x2={i * 3}
              y2="1000"
              stroke="#FEF9C3"
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}
        </G>

        {/* 5. Inner Meeting Edge Gold Braided Rope / Cord */}
        {isRight ? (
          // Left edge of right curtain
          <G>
            {/* Soft drop shadow behind rope */}
            <Rect x="0" y="0" width="7" height="1000" fill="#000000" opacity="0.6" />
            {/* Gold rope core */}
            <Rect x="0" y="0" width="4.5" height="1000" fill="url(#goldRopeGrad)" />
            {/* Diagonal braided twist marks */}
            {Array.from({ length: 120 }).map((_, i) => (
              <Line
                key={i}
                x1="0"
                y1={i * 8.5}
                x2="4.5"
                y2={i * 8.5 + 4}
                stroke="#FEF08A"
                strokeWidth="0.9"
                opacity="0.85"
              />
            ))}
          </G>
        ) : (
          // Right edge of left curtain
          <G>
            {/* Soft drop shadow behind rope */}
            <Rect x="93" y="0" width="7" height="1000" fill="#000000" opacity="0.6" />
            {/* Gold rope core */}
            <Rect x="95.5" y="0" width="4.5" height="1000" fill="url(#goldRopeGrad)" />
            {/* Diagonal braided twist marks */}
            {Array.from({ length: 120 }).map((_, i) => (
              <Line
                key={i}
                x1="95.5"
                y1={i * 8.5}
                x2="100"
                y2={i * 8.5 + 4}
                stroke="#FEF08A"
                strokeWidth="0.9"
                opacity="0.85"
              />
            ))}
          </G>
        )}
      </Svg>
    </View>
  );
}

/**
 * Classic Cinema Pelmet / Valance (Yếm rèm vòm trên cùng rạp chiếu phim)
 * 5 draped scalloped swags with gold fringe tassels spanning across top of theater.
 */
function CinemaValance() {
  return (
    <View style={styles.valanceContainer} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 500 130" preserveAspectRatio="none">
        <Defs>
          {/* Swag velvet 3D draped gradient */}
          <LinearGradient id="swagVelvetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#8A0E17" stopOpacity="1" />
            <Stop offset="35%" stopColor="#C5222D" stopOpacity="1" />
            <Stop offset="70%" stopColor="#7F1018" stopOpacity="1" />
            <Stop offset="100%" stopColor="#250406" stopOpacity="1" />
          </LinearGradient>

          {/* Valance top pelmet horizontal bar gradient */}
          <LinearGradient id="pelmetBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#300305" stopOpacity="1" />
            <Stop offset="30%" stopColor="#991B1B" stopOpacity="1" />
            <Stop offset="70%" stopColor="#B91C1C" stopOpacity="1" />
            <Stop offset="100%" stopColor="#450A0A" stopOpacity="1" />
          </LinearGradient>

          {/* Gold valance rope gradient */}
          <LinearGradient id="valanceGoldRope" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#78350F" stopOpacity="1" />
            <Stop offset="30%" stopColor="#F59E0B" stopOpacity="1" />
            <Stop offset="50%" stopColor="#FEF08A" stopOpacity="1" />
            <Stop offset="75%" stopColor="#D97706" stopOpacity="1" />
            <Stop offset="100%" stopColor="#451A03" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* 1. Behind-valance shadow */}
        <Path
          d="M 0 35 Q 50 118 100 35 Q 150 118 200 35 Q 250 118 300 35 Q 350 118 400 35 Q 450 118 500 35 L 500 0 L 0 0 Z"
          fill="#000000"
          opacity="0.55"
          transform="translate(0, 4)"
        />

        {/* 2. Five Scalloped Velvet Swags */}
        {/* Swag 1: 0 - 100 */}
        <Path d="M 0 32 Q 50 115 100 32 L 100 0 L 0 0 Z" fill="url(#swagVelvetGrad)" />
        {/* Swag 2: 100 - 200 */}
        <Path d="M 100 32 Q 150 115 200 32 L 200 0 L 100 0 Z" fill="url(#swagVelvetGrad)" />
        {/* Swag 3 (Center): 200 - 300 */}
        <Path d="M 200 32 Q 250 120 300 32 L 300 0 L 200 0 Z" fill="url(#swagVelvetGrad)" />
        {/* Swag 4: 300 - 400 */}
        <Path d="M 300 32 Q 350 115 400 32 L 400 0 L 300 0 Z" fill="url(#swagVelvetGrad)" />
        {/* Swag 5: 400 - 500 */}
        <Path d="M 400 32 Q 450 115 500 32 L 500 0 L 400 0 Z" fill="url(#swagVelvetGrad)" />

        {/* 3. Gold Braided Rope Curves outlining each swag */}
        <Path
          d="M 0 32 Q 50 115 100 32 Q 150 115 200 32 Q 250 120 300 32 Q 350 115 400 32 Q 450 115 500 32"
          stroke="url(#valanceGoldRope)"
          strokeWidth="4"
          fill="none"
        />

        {/* 4. Gold Droplet Beads along the bottom curves */}
        {[50, 150, 250, 350, 450].map((cx, i) => (
          <G key={i}>
            <Circle cx={cx} cy={cx === 250 ? 78 : 75} r="3.5" fill="#FEF08A" />
            <Circle cx={cx} cy={cx === 250 ? 86 : 83} r="2.2" fill="#F59E0B" />
          </G>
        ))}

        {/* 5. Gold Theater Tassels at each swag junction (0, 100, 200, 300, 400, 500) */}
        {[0, 100, 200, 300, 400, 500].map((tx, idx) => (
          <G key={idx}>
            {/* Tassel loop/head */}
            <Circle cx={tx} cy="36" r="5.5" fill="url(#valanceGoldRope)" />
            <Circle cx={tx} cy="36" r="3" fill="#FEF08A" />
            {/* Hanging tassel skirt */}
            <Path
              d={`M ${tx - 4} 41 L ${tx + 4} 41 L ${tx + 6} 64 L ${tx - 6} 64 Z`}
              fill="url(#valanceGoldRope)"
            />
            {/* Tassel fringe threads */}
            <Line x1={tx - 3} y1="64" x2={tx - 3} y2="72" stroke="#FEF08A" strokeWidth="1.2" />
            <Line x1={tx} y1="64" x2={tx} y2="74" stroke="#FEF08A" strokeWidth="1.2" />
            <Line x1={tx + 3} y1="64" x2={tx + 3} y2="72" stroke="#FEF08A" strokeWidth="1.2" />
          </G>
        ))}

        {/* 6. Top Horizontal Pelmet Header Bar (Khung viền rèm trên cùng) */}
        <Rect x="0" y="0" width="500" height="30" fill="url(#pelmetBarGrad)" />
        {/* Gold trim along bottom of pelmet bar */}
        <Rect x="0" y="28" width="500" height="3" fill="url(#valanceGoldRope)" />
      </Svg>
    </View>
  );
}

export function WelcomeSplashScreen({ onFinish }: WelcomeSplashScreenProps) {
  // Load Cinzel stylized font
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
    Cinzel_900Black,
  });

  // Animated values for each falling letter
  const dropAnims = useRef(CHARACTERS.map(() => new Animated.Value(-260))).current;
  const fadeAnims = useRef(CHARACTERS.map(() => new Animated.Value(0))).current;
  const rotateAnims = useRef(CHARACTERS.map(() => new Animated.Value(0))).current;

  // Cinema Curtains & valance animated values
  const curtainLeft = useRef(new Animated.Value(0)).current;
  const curtainRight = useRef(new Animated.Value(0)).current;
  const valanceUp = useRef(new Animated.Value(0)).current;
  const valanceFade = useRef(new Animated.Value(1)).current;

  // Text stage animated values
  const textScale = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(1)).current;
  const spotlightPulse = useRef(new Animated.Value(0.5)).current;
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    // 1. Stage spotlight subtle breathing glow
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(spotlightPulse, {
          toValue: 0.85,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(spotlightPulse, {
          toValue: 0.45,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // 2. Staggered falling letters: each drops from top with authentic cinema spring bounce
    const dropAnimations = CHARACTERS.map((_, index) =>
      Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.spring(dropAnims[index], {
          toValue: 0,
          friction: 5,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.spring(rotateAnims[index], {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ])
    );

    // Drop letters sequentially (stagger 70ms)
    Animated.stagger(70, dropAnimations).start(() => {
      // 3. Dramatic theater pause on stage, then grand curtain parting (Màn rèm rạp chiếu phim vén ra)
      setTimeout(() => {
        openCinemaCurtains();
      }, 650);
    });

    return () => {
      pulseLoop.stop();
    };
  }, []);

  const openCinemaCurtains = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const currentHalf = (Dimensions.get('window').width || 420) / 2 + 30;

    Animated.parallel([
      // Left curtain slides majestically to the left
      Animated.timing(curtainLeft, {
        toValue: -currentHalf,
        duration: 950,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: true,
      }),
      // Right curtain slides majestically to the right
      Animated.timing(curtainRight, {
        toValue: currentHalf,
        duration: 950,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: true,
      }),
      // Top theater pelmet lifts upward smoothly and fades
      Animated.timing(valanceUp, {
        toValue: -120,
        duration: 800,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: true,
      }),
      Animated.timing(valanceFade, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }),
      // Gold title smoothly zooms forward into the theater screen
      Animated.timing(textScale, {
        toValue: 1.3,
        duration: 750,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(textFade, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  };

  const fontFamilyBold = fontsLoaded
    ? 'Cinzel_700Bold'
    : Platform.select({ ios: 'Didot-Bold', android: 'serif', default: 'Georgia, serif' });

  return (
    <View style={styles.fullscreenContainer} pointerEvents="box-none">
      {/* ========================================================================= */}
      {/* 1. CINEMA RED VELVET CURTAINS (MÀN RÈM NHUNG ĐỎ RẠP CHIẾU PHIM)           */}
      {/* ========================================================================= */}
      {/* Left Velvet Curtain Wing */}
      <Animated.View
        style={[
          styles.curtainHalf,
          styles.curtainLeftHalf,
          {
            transform: [{ translateX: curtainLeft }],
          },
        ]}
      >
        <VelvetCurtainWing isRight={false} />
      </Animated.View>

      {/* Right Velvet Curtain Wing */}
      <Animated.View
        style={[
          styles.curtainHalf,
          styles.curtainRightHalf,
          {
            transform: [{ translateX: curtainRight }],
          },
        ]}
      >
        <VelvetCurtainWing isRight={true} />
      </Animated.View>

      {/* ========================================================================= */}
      {/* 2. CINEMA TOP VALANCE / PELMET (YẾM RÈM VÒM TRÊN CÙNG)                    */}
      {/* ========================================================================= */}
      <Animated.View
        style={[
          styles.valanceWrapper,
          {
            opacity: valanceFade,
            transform: [{ translateY: valanceUp }],
          },
        ]}
      >
        <CinemaValance />
      </Animated.View>

      {/* ========================================================================= */}
      {/* 3. CENTER STAGE - SPOTLIGHT & FALLING LETTERS "WELCOME TO"                 */}
      {/* ========================================================================= */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={openCinemaCurtains}
        style={styles.centerStage}
      >
        {/* Stage Spotlight Radial Cone */}
        <Animated.View
          style={[
            styles.stageSpotlight,
            {
              opacity: spotlightPulse,
            },
          ]}
        >
          <Svg width="360" height="360" viewBox="0 0 360 360">
            <Defs>
              <RadialGradient id="spotlightGlow" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#FEF08A" stopOpacity="0.32" />
                <Stop offset="40%" stopColor="#F59E0B" stopOpacity="0.18" />
                <Stop offset="75%" stopColor="#DC2626" stopOpacity="0.08" />
                <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="180" cy="180" r="180" fill="url(#spotlightGlow)" />
          </Svg>
        </Animated.View>

        {/* Falling Letters "WELCOME TO" */}
        <Animated.View
          style={[
            styles.lettersRow,
            {
              opacity: textFade,
              transform: [{ scale: textScale }],
            },
          ]}
        >
          {CHARACTERS.map((item, index) => {
            if (item.isSpace) {
              return <View key={item.id} style={styles.spaceItem} />;
            }

            const rotateDeg = rotateAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [index % 2 === 0 ? '-20deg' : '20deg', '0deg'],
            });

            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.letterBox,
                  {
                    opacity: fadeAnims[index],
                    transform: [
                      { translateY: dropAnims[index] },
                      { rotate: rotateDeg },
                    ],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.letterText,
                    {
                      fontFamily: fontFamilyBold,
                    },
                  ]}
                >
                  {item.char}
                </Text>
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* Royal Golden Cinema Filigree Underline */}
        <Animated.View
          style={[
            styles.filigreeRow,
            {
              opacity: textFade,
            },
          ]}
        >
          <View style={styles.filigreeLine} />
          <View style={styles.filigreeDiamond} />
          <View style={styles.filigreeLine} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreenContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 99999,
    backgroundColor: '#0A0102',
  },
  /* ---------------- CURTAIN STYLES ---------------- */
  curtainHalf: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 10,
    overflow: 'hidden',
  },
  curtainLeftHalf: {
    left: 0,
    width: '50.6%',
  },
  curtainRightHalf: {
    right: 0,
    width: '50.6%',
  },
  /* ---------------- TOP VALANCE STYLES ---------------- */
  valanceWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 25,
  },
  valanceContainer: {
    width: '100%',
    height: '100%',
  },
  /* ---------------- CENTER STAGE STYLES ---------------- */
  centerStage: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  stageSpotlight: {
    position: 'absolute',
    width: 360,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  lettersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  letterBox: {
    paddingHorizontal: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceItem: {
    width: 14,
  },
  letterText: {
    fontSize: 34,
    color: '#FFFBEB',
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(245, 158, 11, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 22,
  },
  filigreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  filigreeLine: {
    width: 44,
    height: 2,
    backgroundColor: '#F59E0B',
    borderRadius: 1,
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  filigreeDiamond: {
    width: 8,
    height: 8,
    backgroundColor: '#FEF08A',
    transform: [{ rotate: '45deg' }],
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});
