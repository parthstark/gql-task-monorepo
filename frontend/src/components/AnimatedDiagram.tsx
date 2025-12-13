import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import Svg, { Path, Defs, Marker, Polygon } from 'react-native-svg';
const BOX_WIDTH = 80;
const BOX_HEIGHT = 40;
const BOX_MARGIN = 40;
const ARROW_GAP = 4;
const ANIMATION_DURATION = 2000;
const DASH_PATTERN = '5 5';
const DASH_LENGTH = 10;

interface DiagramBoxProps {
  text: string;
  style: ViewStyle;
}

interface Coordinate {
  x: number;
  y: number;
}

interface PathData {
  id: string;
  d: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DiagramBox: React.FC<DiagramBoxProps> = ({ text, style }) => (
  <View style={[styles.box, style]}>
    <Text style={styles.boxText}>{text}</Text>
  </View>
);

const ArrowMarker: React.FC = () => (
  <Defs>
    <Marker
      id="arrowhead"
      markerWidth="6"
      markerHeight="6"
      refX="5"
      refY="2"
      orient="auto"
    >
      <Polygon points="0 0, 6 2, 0 4" fill="#000" />
    </Marker>
  </Defs>
);

const AnimatedDiagram: React.FC = () => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(320);

  const getPathData = (start: Coordinate, end: Coordinate): string =>
    `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  const coords = useMemo(
    () => ({
      user: { x: containerWidth / 2 - BOX_WIDTH - BOX_MARGIN / 2, y: 40 },
      board: { x: containerWidth / 2 + BOX_MARGIN / 2, y: 40 },
      task: {
        x: containerWidth / 2 - BOX_WIDTH - BOX_MARGIN / 2,
        y: 40 + BOX_HEIGHT + BOX_MARGIN,
      },
      comment: {
        x: containerWidth / 2 - BOX_WIDTH - BOX_MARGIN / 2,
        y: 40 + 2 * (BOX_HEIGHT + BOX_MARGIN),
      },
    }),
    [containerWidth],
  );

  const paths = useMemo<PathData[]>(
    () => [
      {
        id: 'user_board',
        d: getPathData(
          {
            x: coords.user.x + BOX_WIDTH + ARROW_GAP,
            y: coords.user.y + BOX_HEIGHT / 2,
          },
          { x: coords.board.x - ARROW_GAP, y: coords.board.y + BOX_HEIGHT / 2 },
        ),
      },
      {
        id: 'task_user',
        d: getPathData(
          { x: coords.task.x + BOX_WIDTH / 2, y: coords.task.y - ARROW_GAP },
          {
            x: coords.user.x + BOX_WIDTH / 2,
            y: coords.user.y + BOX_HEIGHT + ARROW_GAP,
          },
        ),
      },
      {
        id: 'task_comment',
        d: getPathData(
          {
            x: coords.task.x + BOX_WIDTH / 2,
            y: coords.task.y + BOX_HEIGHT + ARROW_GAP,
          },
          {
            x: coords.comment.x + BOX_WIDTH / 2,
            y: coords.comment.y - ARROW_GAP,
          },
        ),
      },
      {
        id: 'board_task',
        d: getPathData(
          {
            x: coords.board.x + BOX_WIDTH / 2,
            y: coords.board.y + BOX_HEIGHT + ARROW_GAP,
          },
          {
            x: coords.task.x + BOX_WIDTH + ARROW_GAP,
            y: coords.task.y + BOX_HEIGHT / 2,
          },
        ),
      },
    ],
    [coords],
  );

  useEffect(() => {
    const animate = () => {
      animationValue.setValue(0);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
        easing: t => t,
      }).start(animate);
    };
    animate();
  }, [animationValue]);

  return (
    <View
      style={styles.container}
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <View style={styles.svgContainer}>
        <Svg height="100%" width="100%">
          <ArrowMarker />
          {paths.map(path => (
            <AnimatedPath
              key={path.id}
              d={path.d}
              stroke="#000"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={DASH_PATTERN}
              strokeDashoffset={
                animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [DASH_LENGTH, 0],
                }) as unknown as number
              }
              markerEnd="url(#arrowhead)"
            />
          ))}
        </Svg>
      </View>

      {Object.entries(coords).map(([name, coord]) => (
        <DiagramBox
          key={name}
          text={name.charAt(0).toUpperCase() + name.slice(1)}
          style={{
            position: 'absolute',
            top: coord.y,
            left: coord.x,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Calculate required height based on layout
    height: 50 + 3 * (BOX_HEIGHT + BOX_MARGIN) + BOX_HEIGHT,
  },
  box: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default AnimatedDiagram;
