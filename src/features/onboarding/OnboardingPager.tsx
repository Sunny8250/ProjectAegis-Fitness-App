import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/common/Button';
import { Screen } from '@/components/common/Screen';
import { useTheme } from '@/theme/useTheme';

import { onboardingData } from './data/onboardingData';
import { OnboardingPage } from './OnboardingPage';
import { ProgressIndicator } from './ProgressIndicator';
import type { OnboardingItem } from './types';

const NEXT_ROUTE = '/(app)';
const PAGE_TRANSITION_DURATION_MS = 300;
const BUTTON_FADE_DURATION_MS = 300;
const BUTTON_FADE_DELAY_MS = 160;
const INITIAL_CONTENT_TRANSLATE_X = 24;
const FINAL_CONTENT_TRANSLATE_X = 0;

/** Data-driven onboarding pager with FlatList paging and animated page transitions. */
function OnboardingPagerComponent() {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const listRef = useRef<FlatList<OnboardingItem>>(null);
  const fade = useMemo(() => new Animated.Value(1), []);
  const translateX = useMemo(() => new Animated.Value(FINAL_CONTENT_TRANSLATE_X), []);
  const buttonOpacity = useMemo(() => new Animated.Value(0), []);
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastPage = currentIndex === onboardingData.length - 1;

  const navigateToApp = useCallback(() => {
    router.replace(NEXT_ROUTE);
  }, []);

  useEffect(() => {
    buttonOpacity.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(BUTTON_FADE_DELAY_MS),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: BUTTON_FADE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [buttonOpacity, currentIndex]);

  const runPageTransition = useCallback(() => {
    fade.setValue(0);
    translateX.setValue(INITIAL_CONTENT_TRANSLATE_X);
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: PAGE_TRANSITION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: FINAL_CONTENT_TRANSLATE_X,
        duration: PAGE_TRANSITION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, translateX]);

  const handleNext = useCallback(() => {
    if (isLastPage) {
      navigateToApp();
      return;
    }

    listRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  }, [currentIndex, isLastPage, navigateToApp]);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      const nextIndex = Math.max(0, Math.min(pageIndex, onboardingData.length - 1));

      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
        runPageTransition();
      }
    },
    [currentIndex, runPageTransition, width],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<OnboardingItem> | null | undefined, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: OnboardingItem; index: number }) => (
      <OnboardingPage active={index === currentIndex} item={item} width={width} />
    ),
    [currentIndex, width],
  );

  return (
    <Screen contentContainerStyle={styles.screen}>
      <View style={styles.skip}>
        <Button
          accessibilityLabel="Skip onboarding"
          onPress={navigateToApp}
          size="small"
          variant="ghost"
        >
          Skip
        </Button>
      </View>

      <Animated.View style={[styles.content, { opacity: fade, transform: [{ translateX }] }]}>
        <FlatList
          data={onboardingData}
          extraData={currentIndex}
          getItemLayout={getItemLayout}
          horizontal
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          pagingEnabled
          ref={listRef}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      <View style={styles.footer}>
        <ProgressIndicator count={onboardingData.length} currentIndex={currentIndex} />
        <Animated.View style={{ opacity: buttonOpacity }}>
          <Button
            accessibilityLabel={isLastPage ? 'Get started' : 'Next onboarding page'}
            fullWidth
            onPress={handleNext}
            size="large"
          >
            {isLastPage ? 'Get Started' : 'Next'}
          </Button>
        </Animated.View>
      </View>
    </Screen>
  );
}

export const OnboardingPager = memo(OnboardingPagerComponent);

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    skip: {
      alignItems: 'flex-end',
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingTop: theme.spacing.sm,
    },
    content: {
      flex: 1,
      alignSelf: 'stretch',
    },
    footer: {
      gap: theme.spacing.xl,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
  });
