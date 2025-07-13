"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var react_redux_1 = require("react-redux");
var features_1 = require("@/shared/lib/features");
var Skeleton_1 = require("@/shared/ui/deprecated/Skeleton");
var Card_1 = require("@/shared/ui/redesigned/Card");
var Skeleton_2 = require("@/shared/ui/redesigned/Skeleton");
var Rating_1 = require("@/entities/Rating");
var User_1 = require("@/entities/User");
var articleRatingApi_1 = require("../../api/articleRatingApi");
var ArticleRating = react_1.memo(function (props) {
    var _a;
    var className = props.className, articleId = props.articleId;
    var t = react_i18next_1.useTranslation().t;
    var userData = react_redux_1.useSelector(User_1.getUserAuthData);
    var _b = articleRatingApi_1.useGetArticleRating({
        articleId: articleId,
        userId: (_a = userData === null || userData === void 0 ? void 0 : userData.id) !== null && _a !== void 0 ? _a : ""
    }), data = _b.data, isLoading = _b.isLoading;
    var rateArticleMutation = articleRatingApi_1.useRateArticle()[0];
    var handleRateArticle = react_1.useCallback(function (starsCount, feedback) {
        var _a;
        try {
            rateArticleMutation({
                userId: (_a = userData === null || userData === void 0 ? void 0 : userData.id) !== null && _a !== void 0 ? _a : "",
                articleId: articleId,
                rate: starsCount,
                feedback: feedback
            });
        }
        catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, userData === null || userData === void 0 ? void 0 : userData.id]);
    var onAccept = react_1.useCallback(function (starsCount, feedback) {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);
    var onCancel = react_1.useCallback(function (starsCount) {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);
    var Skeleton = features_1.toggleFeatures({
        name: "isAppRedesigned",
        on: function () { return Skeleton_2.Skeleton; },
        off: function () { return Skeleton_1.Skeleton; }
    });
    var border = features_1.toggleFeatures({
        name: "isAppRedesigned",
        on: function () { return "34px"; },
        off: function () { return ""; }
    });
    if (isLoading) {
        return (react_1["default"].createElement(features_1.ToggleFeaturesComponent, { feature: "isAppRedesigned", on: react_1["default"].createElement(Card_1.Card, { max: true, border: "round", padding: "24" },
                react_1["default"].createElement(Skeleton, { width: "100%", height: 120, border: border })), off: react_1["default"].createElement(Skeleton, { width: "100%", height: 120, border: border }) }));
    }
    var rating = data === null || data === void 0 ? void 0 : data[0];
    return (react_1["default"].createElement(Rating_1.RatingCard, { onCancel: onCancel, onAccept: onAccept, rate: rating === null || rating === void 0 ? void 0 : rating.rate, className: className, title: t("Оцените статью"), feedbackTitle: t("Оставьте свой отзыв о статье, это поможет улучшить качество"), hasFeedback: true }));
});
ArticleRating.displayName = "ArticleRating";
exports["default"] = ArticleRating;
