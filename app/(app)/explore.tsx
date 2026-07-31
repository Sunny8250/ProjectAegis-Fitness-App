import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/common/Screen';
import { Text } from '@/components/common/Text';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';

import { TodaysWorkoutSection } from '@/features/dashboard/components/TodaysWorkoutSection';
import { 
  QUICK_FILTERS, 
  ACTIVE_WORKOUT, 
  FEATURED_WORKOUT, 
  RECOMMENDED_CATEGORIES, 
  TRENDING_WORKOUTS, 
  WORKOUT_PROGRAMS, 
  RECENT_WORKOUTS 
} from '@/features/explore/data/mockData';

// Helper for hex opacity
function hexAlpha(hex: string, alpha: number) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ExploreScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <Screen edges={['top']} style={styles.screen}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text variant="heading1" style={styles.title}>Workout Library</Text>
              <Text variant="body" color="text.secondary">Discover your next workout</Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable style={styles.iconButton}>
                <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.text.primary} />
              </Pressable>
            </View>
          </View>
          
          {/* 2. Smart Search */}
          <Input 
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search workouts, muscles, equipment..."
            leftAccessory={<MaterialCommunityIcons name="magnify" size={20} color={theme.colors.text.secondary} />}
            rightAccessory={<MaterialCommunityIcons name="microphone" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.searchInput}
            label={null}
          />
        </View>

        {/* 3. Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          style={styles.filtersWrapper}
        >
          {QUICK_FILTERS.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <Pressable 
                key={filter} 
                onPress={() => setActiveFilter(filter)}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text 
                  variant="small" 
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* 4. Aegis AI Recommendation */}
        <TodaysWorkoutSection isLoading={false} />

        {/* 5. Featured Workout */}
        <View style={styles.section}>
          <Card padding="none" style={styles.featuredCard}>
            <View style={styles.featuredImageWrap}>
              <Image 
                source={{ uri: FEATURED_WORKOUT.imageUri }} 
                style={StyleSheet.absoluteFill} 
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', hexAlpha(theme.colors.background, 0.9)]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.featuredOverlay}>
                <View style={styles.aiBadge}>
                  <MaterialCommunityIcons name="robot" size={14} color="#FFF" />
                  <Text variant="small" style={styles.aiBadgeText}>Featured</Text>
                </View>
                <Text variant="heading2" style={styles.featuredTitle}>{FEATURED_WORKOUT.title}</Text>
                
                <View style={styles.featuredStats}>
                  <Text variant="small" style={styles.featuredStatText}>{FEATURED_WORKOUT.difficulty}</Text>
                  <Text variant="small" style={styles.featuredStatText}>•</Text>
                  <Text variant="small" style={styles.featuredStatText}>{FEATURED_WORKOUT.duration}</Text>
                  <Text variant="small" style={styles.featuredStatText}>•</Text>
                  <Text variant="small" style={styles.featuredStatText}>{FEATURED_WORKOUT.calories}</Text>
                </View>
              </View>
            </View>
            <View style={styles.featuredActions}>
              <Button variant="primary" fullWidth>Start Workout</Button>
              <Button variant="outline" fullWidth>View Details</Button>
            </View>
          </Card>
        </View>

        {/* 6. Continue Workout */}
        {ACTIVE_WORKOUT && (
          <View style={styles.section}>
            <Text variant="title" style={styles.sectionTitle}>Continue where you left off</Text>
            <Card style={styles.activeWorkoutCard}>
              <View style={styles.activeHeader}>
                <View style={styles.activeIconWrap}>
                  <MaterialCommunityIcons name="play-circle" size={24} color={theme.colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="title" style={{ marginBottom: 4 }}>{ACTIVE_WORKOUT.title}</Text>
                  <Text variant="small" color="text.secondary">
                    {ACTIVE_WORKOUT.remainingExercises} exercises left • {ACTIVE_WORKOUT.remainingTime}
                  </Text>
                </View>
                <Button variant="primary" size="small">Resume</Button>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${ACTIVE_WORKOUT.progress * 100}%` }]} />
              </View>
            </Card>
          </View>
        )}

        {/* 7. Recommended Categories */}
        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle}>Recommended Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {RECOMMENDED_CATEGORIES.map(category => (
              <Pressable key={category.id} style={styles.categoryCard}>
                <Image source={{ uri: category.imageUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']} style={StyleSheet.absoluteFill} />
                <View style={styles.categoryContent}>
                  <Text variant="title" style={{ color: '#FFF' }}>{category.title}</Text>
                  <Text variant="small" style={{ color: '#DDD' }}>{category.count} workouts</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 8. Trending Workouts */}
        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle}>Trending Workouts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {TRENDING_WORKOUTS.map(workout => (
              <Card key={workout.id} padding="none" style={styles.workoutCard}>
                <Image source={{ uri: workout.imageUri }} style={styles.workoutImage} contentFit="cover" />
                <View style={styles.workoutContent}>
                  <Text variant="body" style={styles.workoutTitle} numberOfLines={2}>{workout.title}</Text>
                  <Text variant="caption" color="text.secondary">
                    {workout.duration} • {workout.difficulty}
                  </Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* 9. Workout Programs */}
        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle}>Workout Programs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {WORKOUT_PROGRAMS.map(program => (
              <Pressable key={program.id} style={styles.programCard}>
                <Image source={{ uri: program.imageUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={StyleSheet.absoluteFill} />
                <View style={styles.programContent}>
                  <Text variant="title" style={{ color: '#FFF', marginBottom: 4 }}>{program.title}</Text>
                  <View style={styles.programProgress}>
                    <Text variant="caption" style={{ color: '#CCC', marginBottom: 6 }}>
                      {program.daysCompleted}/{program.totalDays} Days
                    </Text>
                    <View style={styles.progressBarBgProgram}>
                      <View style={[styles.progressBarFillProgram, { width: `${program.progress * 100}%` }]} />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 10. Recently Completed */}
        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle}>Recently Completed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {RECENT_WORKOUTS.map(workout => (
              <Card key={workout.id} padding="none" style={styles.workoutCard}>
                <Image source={{ uri: workout.imageUri }} style={styles.workoutImage} contentFit="cover" />
                <View style={styles.workoutContent}>
                  <Text variant="body" style={styles.workoutTitle} numberOfLines={2}>{workout.title}</Text>
                  <Text variant="caption" color="text.secondary">
                    {workout.duration} • {workout.difficulty}
                  </Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* 11. Bottom CTA (Integrated) */}
        <View style={styles.integratedCtaWrap}>
          <Button 
            variant="primary" 
            size="large" 
            style={styles.integratedCta}
            leftIcon={<MaterialCommunityIcons name="view-grid" size={20} color="#FFF" />}
          >
            Browse All Workouts
          </Button>
        </View>

      </ScrollView>
    </Screen>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: 100, // Ensure it clears the bottom tab bar
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontWeight: '800',
      marginBottom: 4,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.border, 0.5),
    },
    searchInput: {
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface,
    },
    filtersWrapper: {
      marginBottom: theme.spacing.xl,
    },
    filtersContainer: {
      paddingHorizontal: theme.spacing.lg,
      gap: 8,
    },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
    },
    chipActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
    },
    chipTextActive: {
      color: '#FFF',
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      fontWeight: '700',
    },
    horizontalScroll: {
      paddingHorizontal: theme.spacing.lg,
      gap: 16,
    },
    featuredCard: {
      marginHorizontal: theme.spacing.lg,
      borderRadius: theme.radius.xl,
      overflow: 'hidden',
      borderWidth: 0,
      elevation: 4,
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    featuredImageWrap: {
      height: 380, // Taller portrait style
      width: '100%',
      justifyContent: 'flex-end',
    },
    featuredOverlay: {
      padding: theme.spacing.lg,
    },
    aiBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.primary, 0.9),
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      marginBottom: 8,
      gap: 4,
    },
    aiBadgeText: {
      color: '#FFF',
      fontWeight: '700',
      fontSize: 10,
      textTransform: 'uppercase',
    },
    featuredTitle: {
      color: '#FFF',
      fontWeight: '800',
      marginBottom: 6,
    },
    featuredStats: {
      flexDirection: 'row',
      gap: 8,
    },
    featuredStatText: {
      color: '#E2E8F0',
      fontWeight: '600',
    },
    featuredActions: {
      gap: 12,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
    },
    activeWorkoutCard: {
      marginHorizontal: theme.spacing.lg,
      backgroundColor: hexAlpha(theme.colors.primary, 0.08),
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.3),
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    activeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    activeIconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressBarBg: {
      height: 6, // Slightly thicker progress bar
      backgroundColor: hexAlpha(theme.colors.border, 0.5),
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
    },
    categoryCard: {
      width: 140,
      height: 140,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      borderWidth: 0,
    },
    categoryContent: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: theme.spacing.sm,
    },
    workoutCard: {
      width: 160, // Narrower for portrait
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    workoutImage: {
      width: '100%',
      height: 200, // Taller portrait image
    },
    workoutContent: {
      padding: theme.spacing.sm,
    },
    workoutTitle: {
      fontWeight: '700',
      marginBottom: 4,
    },
    programCard: {
      width: 260,
      height: 160,
      borderRadius: theme.radius.xl,
      overflow: 'hidden',
      borderWidth: 0,
    },
    programImage: {
      width: '100%',
      height: '100%',
    },
    programContent: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: theme.spacing.md,
    },
    programProgress: {
      width: '100%',
    },
    progressBarBgProgram: {
      height: 4,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressBarFillProgram: {
      height: '100%',
      backgroundColor: theme.colors.success,
      borderRadius: 2,
    },
    integratedCtaWrap: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
    },
    integratedCta: {
      borderRadius: theme.radius.full,
      height: 56,
    },
  });
}
