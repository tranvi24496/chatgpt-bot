require('dotenv').config();
const axios = require('./axiosInstance');
const { encodeByBase64 } = require('../utils');


const POE_URL = "https://poe.com/api/gql_POST";

const sendMessage = (message, chatId, bot) => {
    return axios.post(
        POE_URL,
        `{\"queryName\":\"chatHelpers_sendMessageMutation_Mutation\",\"variables\":{\"chatId\":${chatId},\"bot\":\"${bot}\",\"query\":\"${message}\",\"source\":null,\"withChatBreak\":false},\"query\":\"mutation chatHelpers_sendMessageMutation_Mutation(\\n  $chatId: BigInt!\\n  $bot: String!\\n  $query: String!\\n  $source: MessageSource\\n  $withChatBreak: Boolean!\\n) {\\n  messageEdgeCreate(chatId: $chatId, bot: $bot, query: $query, source: $source, withChatBreak: $withChatBreak) {\\n    chatBreak {\\n      cursor\\n      node {\\n        id\\n        messageId\\n        text\\n        author\\n        suggestedReplies\\n        creationTime\\n        state\\n      }\\n      id\\n    }\\n    message {\\n      cursor\\n      node {\\n        id\\n        messageId\\n        text\\n        author\\n        suggestedReplies\\n        creationTime\\n        state\\n        chat {\\n          shouldShowDisclaimer\\n          id\\n        }\\n      }\\n      id\\n    }\\n  }\\n}\\n\"}`
    );
};

const fetchMessage = async(chatId, count = 2) => {
    const id = encodeByBase64(`Chat:${chatId}`);
    const resp = await axios.post(
        POE_URL,
        `{\"queryName\":\"ChatListPaginationQuery\",\"variables\":{\"count\":2,\"cursor\":null,\"id\":\"${id}\"},\"query\":\"query ChatListPaginationQuery(\\n  $count: Int = 5\\n  $cursor: String\\n  $id: ID!\\n) {\\n  node(id: $id) {\\n    __typename\\n    ...ChatPageMain_chat_1G22uz\\n    id\\n  }\\n}\\n\\nfragment BotImage_bot on Bot {\\n  image {\\n    __typename\\n    ... on LocalBotImage {\\n      localName\\n    }\\n    ... on UrlBotImage {\\n      url\\n    }\\n  }\\n  displayName\\n}\\n\\nfragment ChatMessageDownvotedButton_message on Message {\\n  ...MessageFeedbackReasonModal_message\\n  ...MessageFeedbackOtherModal_message\\n}\\n\\nfragment ChatMessageDropdownMenu_message on Message {\\n  id\\n  messageId\\n  vote\\n  text\\n  author\\n  ...chatHelpers_isBotMessage\\n}\\n\\nfragment ChatMessageFeedbackButtons_message on Message {\\n  id\\n  messageId\\n  vote\\n  voteReason\\n  ...ChatMessageDownvotedButton_message\\n}\\n\\nfragment ChatMessageInputView_chat on Chat {\\n  id\\n  chatId\\n  defaultBotObject {\\n    nickname\\n    messageLimit {\\n      dailyBalance\\n      shouldShowRemainingMessageCount\\n    }\\n    hasClearContext\\n    id\\n  }\\n  shouldShowDisclaimer\\n  ...chatHelpers_useSendMessage_chat\\n  ...chatHelpers_useSendChatBreak_chat\\n}\\n\\nfragment ChatMessageInputView_edges on MessageEdge {\\n  node {\\n    ...chatHelpers_isChatBreak\\n    ...chatHelpers_isHumanMessage\\n    state\\n    text\\n    id\\n  }\\n}\\n\\nfragment ChatMessageOverflowButton_message on Message {\\n  text\\n  ...ChatMessageDropdownMenu_message\\n  ...chatHelpers_isBotMessage\\n}\\n\\nfragment ChatMessageSuggestedReplies_SuggestedReplyButton_chat on Chat {\\n  ...chatHelpers_useSendMessage_chat\\n}\\n\\nfragment ChatMessageSuggestedReplies_SuggestedReplyButton_message on Message {\\n  messageId\\n}\\n\\nfragment ChatMessageSuggestedReplies_chat on Chat {\\n  ...ChatWelcomeView_chat\\n  ...ChatMessageSuggestedReplies_SuggestedReplyButton_chat\\n  defaultBotObject {\\n    hasSuggestedReplies\\n    id\\n  }\\n}\\n\\nfragment ChatMessageSuggestedReplies_message on Message {\\n  suggestedReplies\\n  ...ChatMessageSuggestedReplies_SuggestedReplyButton_message\\n}\\n\\nfragment ChatMessage_chat on Chat {\\n  defaultBotObject {\\n    ...ChatPageDisclaimer_bot\\n    messageLimit {\\n      ...ChatPageRateLimitedBanner_messageLimit\\n    }\\n    id\\n  }\\n  ...ChatMessageSuggestedReplies_chat\\n  ...ChatWelcomeView_chat\\n}\\n\\nfragment ChatMessage_message on Message {\\n  id\\n  messageId\\n  text\\n  author\\n  linkifiedText\\n  state\\n  ...ChatMessageSuggestedReplies_message\\n  ...ChatMessageFeedbackButtons_message\\n  ...ChatMessageOverflowButton_message\\n  ...chatHelpers_isHumanMessage\\n  ...chatHelpers_isBotMessage\\n  ...chatHelpers_isChatBreak\\n  ...chatHelpers_useTimeoutLevel\\n  ...MarkdownLinkInner_message\\n}\\n\\nfragment ChatMessagesView_chat on Chat {\\n  ...ChatMessage_chat\\n  ...ChatWelcomeView_chat\\n  defaultBotObject {\\n    messageLimit {\\n      ...ChatPageRateLimitedBanner_messageLimit\\n    }\\n    id\\n  }\\n}\\n\\nfragment ChatMessagesView_edges on MessageEdge {\\n  node {\\n    id\\n    messageId\\n    creationTime\\n    ...ChatMessage_message\\n    ...chatHelpers_isBotMessage\\n    ...chatHelpers_isHumanMessage\\n    ...chatHelpers_isChatBreak\\n  }\\n}\\n\\nfragment ChatPageDeleteFooter_chat on Chat {\\n  ...MessageDeleteConfirmationModal_chat\\n}\\n\\nfragment ChatPageDisclaimer_bot on Bot {\\n  disclaimer\\n}\\n\\nfragment ChatPageMain_chat_1G22uz on Chat {\\n  id\\n  chatId\\n  ...ChatMessageInputView_chat\\n  ...ChatPageShareFooter_chat\\n  ...ChatPageDeleteFooter_chat\\n  ...ChatMessagesView_chat\\n  ...MarkdownLinkInner_chat\\n  ...chatHelpers_useUpdateStaleChat_chat\\n  ...ChatSubscriptionPaywallContextWrapper_chat\\n  messagesConnection(last: $count, before: $cursor) {\\n    edges {\\n      ...ChatMessagesView_edges\\n      ...ChatMessageInputView_edges\\n      ...MarkdownLinkInner_edges\\n      node {\\n        ...chatHelpers_useUpdateStaleChat_message\\n        id\\n        __typename\\n      }\\n      cursor\\n      id\\n    }\\n    pageInfo {\\n      hasPreviousPage\\n      startCursor\\n    }\\n    id\\n  }\\n}\\n\\nfragment ChatPageRateLimitedBanner_messageLimit on MessageLimit {\\n  numMessagesRemaining\\n}\\n\\nfragment ChatPageShareFooter_chat on Chat {\\n  chatId\\n}\\n\\nfragment ChatSubscriptionPaywallContextWrapper_chat on Chat {\\n  defaultBotObject {\\n    messageLimit {\\n      numMessagesRemaining\\n      shouldShowRemainingMessageCount\\n    }\\n    ...SubscriptionPaywallModal_bot\\n    id\\n  }\\n}\\n\\nfragment ChatWelcomeView_ChatWelcomeButton_chat on Chat {\\n  ...chatHelpers_useSendMessage_chat\\n}\\n\\nfragment ChatWelcomeView_chat on Chat {\\n  ...ChatWelcomeView_ChatWelcomeButton_chat\\n  defaultBotObject {\\n    displayName\\n    hasWelcomeTopics\\n    id\\n  }\\n}\\n\\nfragment MarkdownLinkInner_chat on Chat {\\n  id\\n  chatId\\n  defaultBotObject {\\n    nickname\\n    id\\n  }\\n  ...chatHelpers_useSendMessage_chat\\n}\\n\\nfragment MarkdownLinkInner_edges on MessageEdge {\\n  node {\\n    state\\n    id\\n  }\\n}\\n\\nfragment MarkdownLinkInner_message on Message {\\n  messageId\\n}\\n\\nfragment MessageDeleteConfirmationModal_chat on Chat {\\n  id\\n}\\n\\nfragment MessageFeedbackOtherModal_message on Message {\\n  id\\n  messageId\\n}\\n\\nfragment MessageFeedbackReasonModal_message on Message {\\n  id\\n  messageId\\n}\\n\\nfragment SubscriptionPaywallModal_bot on Bot {\\n  displayName\\n  messageLimit {\\n    dailyLimit\\n    numMessagesRemaining\\n    shouldShowRemainingMessageCount\\n    resetTime\\n  }\\n  ...BotImage_bot\\n}\\n\\nfragment chatHelpers_isBotMessage on Message {\\n  ...chatHelpers_isHumanMessage\\n  ...chatHelpers_isChatBreak\\n}\\n\\nfragment chatHelpers_isChatBreak on Message {\\n  author\\n}\\n\\nfragment chatHelpers_isHumanMessage on Message {\\n  author\\n}\\n\\nfragment chatHelpers_useSendChatBreak_chat on Chat {\\n  id\\n  chatId\\n  defaultBotObject {\\n    nickname\\n    introduction\\n    model\\n    id\\n  }\\n  shouldShowDisclaimer\\n}\\n\\nfragment chatHelpers_useSendMessage_chat on Chat {\\n  id\\n  chatId\\n  defaultBotObject {\\n    nickname\\n    id\\n  }\\n  shouldShowDisclaimer\\n}\\n\\nfragment chatHelpers_useTimeoutLevel on Message {\\n  id\\n  state\\n  text\\n  messageId\\n}\\n\\nfragment chatHelpers_useUpdateStaleChat_chat on Chat {\\n  chatId\\n  ...chatHelpers_useSendChatBreak_chat\\n}\\n\\nfragment chatHelpers_useUpdateStaleChat_message on Message {\\n  creationTime\\n  ...chatHelpers_isChatBreak\\n}\\n\"}`
    );

    return resp.data.node.messagesConnection.edges.map(message => {
        return message.node;
    });
};

module.exports = {
    sendMessage,
    fetchMessage
};
