import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { colors } from "../../utils/Constants";

const PAGE_CHANGE_DELAY = 4000;
const viewPropTypes = ViewPropTypes || View.propTypes;

/**
 * Base class for slider component with slider timing and infinite loop
 */
export default class Carousel extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    autoplay: PropTypes.bool,
    delay: PropTypes.number,
    currentPage: PropTypes.number,
    style: viewPropTypes.style,
    pageStyle: viewPropTypes.style,
    contentContainerStyle: viewPropTypes.style,
    pageInfo: PropTypes.bool,
    pageInfoBackgroundColor: PropTypes.string,
    pageInfoTextStyle: Text.propTypes.style,
    pageInfoBottomContainerStyle: viewPropTypes.style,
    pageInfoTextSeparator: PropTypes.string,
    bullets: PropTypes.bool,
    bulletsContainerStyle: Text.propTypes.style,
    bulletStyle: Text.propTypes.style,
    arrows: PropTypes.bool,
    arrowsContainerStyle: Text.propTypes.style,
    arrowStyle: Text.propTypes.style,
    leftArrowStyle: Text.propTypes.style,
    rightArrowStyle: Text.propTypes.style,
    leftArrowText: PropTypes.string,
    rightArrowText: PropTypes.string,
    chosenBulletStyle: Text.propTypes.style,
    onAnimateNextPage: PropTypes.func,
    onPageBeingChanged: PropTypes.func,
    swipe: PropTypes.bool,
    isLooped: PropTypes.bool,
  };

  static defaultProps = {
    delay: PAGE_CHANGE_DELAY,
    autoplay: true,
    pageInfo: false,
    bullets: false,
    arrows: false,
    pageInfoBackgroundColor: colors.blackOpacityColor3,
    pageInfoTextSeparator: " / ",
    currentPage: 0,
    style: undefined,
    pageStyle: undefined,
    contentContainerStyle: undefined,
    pageInfoTextStyle: undefined,
    pageInfoBottomContainerStyle: undefined,
    bulletsContainerStyle: undefined,
    chosenBulletStyle: undefined,
    bulletStyle: undefined,
    arrowsContainerStyle: undefined,
    arrowStyle: undefined,
    leftArrowStyle: undefined,
    rightArrowStyle: undefined,
    leftArrowText: "",
    rightArrowText: "",
    onAnimateNextPage: undefined,
    onPageBeingChanged: undefined,
    swipe: true,
    isLooped: true,
  };

  constructor(props) {
    super(props);
    const size = { width: 0, height: 0 };
    if (props.children) {
      const childrenLength = React.Children.count(props.children) || 1;
      this.state = {
        currentPage: props.currentPage,
        size,
        childrenLength,
        contents: null
      };
    } else {
      this.state = { size };
    }
    this.offset = 0;
    this.nextPage = 0;
  }

  componentDidMount() {
    if (this.state.childrenLength) {
      this.setUpTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  componentWillReceiveProps({ children }) {
    if (!isEqual(this.props.children, children)) {
      const { currentPage } = this.state;
      this.clearTimer();
      let childrenLength = 0;
      if (children) {
        childrenLength = React.Children.count(children) || 1;
      }
      const nextPage = currentPage >= childrenLength ? childrenLength - 1 : currentPage;
      this.setState({ childrenLength }, () => {
        this.animateToPage(nextPage);
        this.setUpTimer();
      });
    }
  }

  /**
   * add slider data to state and render all
   *  @param  {}  none
   *  @returns {JSX} JSX element
   *
   */
  setUpPages() {
    const { size } = this.state;
    const { children: propsChildren, isLooped, pageStyle } = this.props;
    const children = React.Children.toArray(propsChildren);
    const pages = [];

    if (children && children.length > 1) {
      pages.push(...children);
      if (isLooped) {
        pages.push(children[0]);
        pages.push(children[1]);
      }
    } else if (children) {
      pages.push(children[0]);
    } else {
      pages.push(
        <View>
          <Text>{"Looped Carousel"}</Text>
        </View>
      );
    }
    return pages.map((page, i) => (
      <TouchableWithoutFeedback style={[{ ...size }, pageStyle]} key={`page${i}`}>
        {page}
      </TouchableWithoutFeedback>
    ));
  }

  /**
   * to get current showing slider page
   * @param {} None
   * @returns {} None
   */
  getCurrentPage() {
    return this.state.currentPage;
  }

  /**
   * Animates next slider
   * @param {} currentPage next slider page data
   * @returns {} None
   */
  setCurrentPage = currentPage => {
    this.setState({ currentPage }, () => {
      if (this.props.onAnimateNextPage) {
        this.props.onAnimateNextPage(currentPage);
      }
    });
  };

  /**
   * clears timer
   * @param {} None
   * @returns {} None
   */
  onScrollBegin = () => {
    this.clearTimer();
  };

  /**
   * sets timer and calculates offset for slider
   * @param {} None
   * @returns {} None
   */
  onScrollEnd = event => {
    const offset = { ...event.nativeEvent.contentOffset };
    const page = this.calculateCurrentPage(offset.x);
    this.placeCritical(page);
    this.setCurrentPage(page);
    this.setUpTimer();
  };

  /**
   * Calculates offset for slider, direction and changes page
   * @param {} event Event context
   * @returns {} None
   */
  onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.x;
    const direction = currentOffset > this.offset ? "right" : "left";
    this.offset = currentOffset;
    const nextPage = this.calculateNextPage(direction);
    if (this.nextPage !== nextPage) {
      this.nextPage = nextPage;
      if (this.props.onPageBeingChanged) {
        this.props.onPageBeingChanged(this.nextPage);
      }
    }
  };

  /**
   * Handles layout change
   * @param {} event Event context
   * @returns {} None
   */
  onLayout = event => {
    const { height, width } = event.nativeEvent.layout;
    this.setState({ size: { width, height } });
    setTimeout(() => this.placeCritical(this.state.currentPage), 0);
  };

  /**
   * clears timer
   * @param {} None
   * @returns {} None
   */
  clearTimer = () => {
    clearTimeout(this.timer);
  };

  /**
   * sets timer
   * @param {} None
   * @returns {} None
   */
  setUpTimer = () => {
    if (this.props.autoplay && React.Children.count(this.props.children) > 1) {
      this.clearTimer();
      this.timer = setTimeout(this.animateNextPage, this.props.delay);
    }
  };

  /**
   * Handles slider scroll
   * @param {Object} Object offset value, animated value and nofix flag
   * @returns {} None
   */
  scrollTo = ({ offset, animated, nofix }) => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: offset, animated });
      if (!nofix && Platform.OS === "android" && !animated) {
        this.scrollView.scrollTo({ y: 0, x: offset, animated: true });
      }
    }
  };

  /**
   * Animates next slider page
   * @param {} None
   * @returns {} None
   */
  animateNextPage = () => {
    const { currentPage } = this.state;
    const nextPage = this.normalizePageNumber(currentPage + 1);

    if (!this.props.isLooped && nextPage < currentPage) {
      return;
    }
    this.animateToPage(nextPage);
  };

  /**
   * Animates previous slider page
   * @param {} None
   * @returns {} None
   */
  animatePreviousPage = () => {
    const { currentPage } = this.state;
    const nextPage = this.normalizePageNumber(currentPage - 1);

    if (!this.props.isLooped && nextPage > currentPage) {
      return;
    }
    this.animateToPage(nextPage);
  };

  /**
   * Animated particular slider page
   * @param {Number} page Slider page index
   * @returns {} None
   */
  animateToPage = page => {
    const {
      currentPage,
      childrenLength,
      size: { width }
    } = this.state;
    const { isLooped } = this.props;
    const nextPage = this.normalizePageNumber(page);
    this.clearTimer();
    if (nextPage === currentPage) {
    } else if (nextPage === 0) {
      if (isLooped) {
        if (currentPage !== childrenLength - 1) {
          this.scrollTo({
            offset: (childrenLength + 2) * width,
            animated: false,
            nofix: true
          });
        }
        this.scrollTo({ offset: childrenLength * width, animated: true });
      } else {
        this.scrollTo({ offset: 0, animated: true });
      }
    } else if (nextPage === 1) {
      if (currentPage === 0 && isLooped) {
        this.scrollTo({ offset: 0, animated: false, nofix: true });
      }
      this.scrollTo({ offset: width, animated: true });
    } else {
      if (currentPage === 0 && nextPage !== childrenLength - 1) {
        this.scrollTo({ offset: 0, animated: false, nofix: true });
      }
      this.scrollTo({ offset: nextPage * width, animated: true });
    }
    this.setCurrentPage(nextPage);
    this.setUpTimer();
  };

  /**
   * calculates offset and scrolls to particular page
   * @param {Number} page Slider page index
   * @returns {} None
   */
  placeCritical = page => {
    const { isLooped } = this.props;
    const {
      childrenLength,
      size: { width }
    } = this.state;
    let offset = 0;

    if (page < childrenLength) {
      if (page === 0 && isLooped) {
        offset = childrenLength * width;
      } else {
        offset = page * width;
      }
    }

    this.scrollTo({ offset, animated: false });
  };

  /**
   * normalizes page index
   * @param {Number} page Slider page index
   * @returns {Number} slider page index
   */
  normalizePageNumber = page => {
    const { childrenLength } = this.state;

    if (page === childrenLength) {
      return 0;
    } else if (page > childrenLength) {
      return 1;
    } else if (page < 0) {
      return childrenLength - 1;
    }
    return page;
  };

  /**
   * calculates page index
   * @param {Number} offset Slider page offset
   * @returns {Number} slider page index
   */
  calculateCurrentPage = offset => {
    const { width } = this.state.size;
    const page = Math.round(offset / width);
    return this.normalizePageNumber(page);
  };

  /**
   * calculates next page index
   * @param {String} direction Slide direction
   * @returns {Number} slider page index
   */
  calculateNextPage = direction => {
    const { width } = this.state.size;
    const ratio = this.offset / width;
    const page = direction === "right" ? Math.ceil(ratio) : Math.floor(ratio);
    return this.normalizePageNumber(page);
  };

  /**
   * renders JSX element
   * @param {Number} pageLength Slider Length
   * @returns {JSX} JSX element
   */
  renderPageInfo = pageLength => (
    <View style={[styles.pageInfoBottomContainer, this.props.pageInfoBottomContainerStyle]} pointerEvents="none">
      <View style={styles.pageInfoContainer}>
        <View style={[styles.pageInfoPill, { backgroundColor: this.props.pageInfoBackgroundColor }]}>
          <Text style={[styles.pageInfoText, this.props.pageInfoTextStyle]}>
            {`${this.state.currentPage + 1}${this.props.pageInfoTextSeparator}${pageLength}`}
          </Text>
        </View>
      </View>
    </View>
  );

  /**
   * renders JSX element
   * @param {Number} pageLength Slider Length
   * @returns {JSX} JSX element
   */
  renderBullets = pageLength => {
    const bullets = [];
    for (let i = 0; i < pageLength; i += 1) {
      bullets.push(
        <TouchableWithoutFeedback onPress={() => this.animateToPage(i)} key={`bullet${i}`}>
          <View
            style={
              i === this.state.currentPage
                ? [styles.chosenBullet, this.props.chosenBulletStyle]
                : [styles.bullet, this.props.bulletStyle]
            }
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View style={[styles.bullets, this.props.bulletsContainerStyle]} pointerEvents="box-none">
        {bullets}
      </View>
    );
  };

  /**
   * renders JSX element
   * @param {} None
   * @returns {JSX} JSX element
   */
  renderArrows = () => {
    let { currentPage } = this.state;
    const { childrenLength } = this.state;
    if (currentPage < 1) {
      currentPage = childrenLength;
    }
    return (
      <View style={styles.arrows} pointerEvents="box-none">
        <View style={[styles.arrowsContainer, this.props.arrowsContainerStyle]} pointerEvents="box-none">
          <TouchableOpacity onPress={this.animatePreviousPage} style={this.props.arrowStyle}>
            <Text style={this.props.leftArrowStyle}>
              {this.props.leftArrowText ? this.props.leftArrowText : "Left"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.animateNextPage} style={this.props.arrowStyle}>
            <Text style={this.props.rightArrowStyle}>
              {this.props.rightArrowText ? this.props.rightArrowText : "Right"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const contents = this.setUpPages();

    const containerProps = {
      onLayout: this.onLayout,
      style: [this.props.style]
    };

    const { size, childrenLength } = this.state;

    return (
      <View {...containerProps}>
        <ScrollView
          ref={c => {
            this.scrollView = c;
          }}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}
          onScroll={this.onScroll}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          contentInset={{ top: 0 }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          scrollEnabled={this.props.swipe}
          contentContainerStyle={[
            styles.horizontalScroll,
            this.props.contentContainerStyle,
            {
              width: size.width * (childrenLength + (childrenLength > 1 && this.props.isLooped ? 2 : 0)),
              height: size.height
            }
          ]}
        >
          {contents}
        </ScrollView>
        {this.props.arrows && this.renderArrows(this.state.childrenLength)}
        {this.props.bullets && this.renderBullets(this.state.childrenLength)}
        {this.props.pageInfo && this.renderPageInfo(this.state.childrenLength)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalScroll: {
    position: "absolute"
  },
  pageInfoBottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  },
  pageInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  pageInfoPill: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  pageInfoText: {
    textAlign: "center"
  },
  bullets: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 999
  },
  arrows: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "transparent"
  },
  arrowsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  chosenBullet: {
    margin: 2,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGrayColor1,
  },
  bullet: {
    margin: 2,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGrayColor2,
    borderColor: colors.lightGrayColor2,
    borderWidth: 1
  }
});
