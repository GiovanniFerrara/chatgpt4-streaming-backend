import { combineChunks } from "./utils";

const chunks = [
  {
    index: 0,
    id: "call_XcZRCd0h1lEcGtsk3hbYAsIL",
    type: "function",
    function: {
      name: "create_ui_component",
      arguments: "",
    },
  },
  {
    index: 0,
    function: {
      arguments: '{"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "title",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "How",
    },
  },
  {
    index: 0,
    function: {
      arguments: " Old",
    },
  },
  {
    index: 0,
    function: {
      arguments: " Are",
    },
  },
  {
    index: 0,
    function: {
      arguments: " You",
    },
  },
  {
    index: 0,
    function: {
      arguments: "?",
    },
  },
  {
    index: 0,
    function: {
      arguments: '","',
    },
  },
  {
    index: 0,
    function: {
      arguments: "text",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "Unfortunately",
    },
  },
  {
    index: 0,
    function: {
      arguments: ",",
    },
  },
  {
    index: 0,
    function: {
      arguments: " I",
    },
  },
  {
    index: 0,
    function: {
      arguments: " can't",
    },
  },
  {
    index: 0,
    function: {
      arguments: " determine",
    },
  },
  {
    index: 0,
    function: {
      arguments: " your",
    },
  },
  {
    index: 0,
    function: {
      arguments: " age",
    },
  },
  {
    index: 0,
    function: {
      arguments: " from",
    },
  },
  {
    index: 0,
    function: {
      arguments: " this",
    },
  },
  {
    index: 0,
    function: {
      arguments: " interaction",
    },
  },
  {
    index: 0,
    function: {
      arguments: ".",
    },
  },
  {
    index: 0,
    function: {
      arguments: " Would",
    },
  },
  {
    index: 0,
    function: {
      arguments: " you",
    },
  },
  {
    index: 0,
    function: {
      arguments: " like",
    },
  },
  {
    index: 0,
    function: {
      arguments: " help",
    },
  },
  {
    index: 0,
    function: {
      arguments: " on",
    },
  },
  {
    index: 0,
    function: {
      arguments: " how",
    },
  },
  {
    index: 0,
    function: {
      arguments: " to",
    },
  },
  {
    index: 0,
    function: {
      arguments: " find",
    },
  },
  {
    index: 0,
    function: {
      arguments: " out",
    },
  },
  {
    index: 0,
    function: {
      arguments: " your",
    },
  },
  {
    index: 0,
    function: {
      arguments: " age",
    },
  },
  {
    index: 0,
    function: {
      arguments: "?",
    },
  },
  {
    index: 0,
    function: {
      arguments: '","',
    },
  },
  {
    index: 0,
    function: {
      arguments: "buttons",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":[',
    },
  },
  {
    index: 0,
    function: {
      arguments: '{"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "label",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "Yes",
    },
  },
  {
    index: 0,
    function: {
      arguments: ",",
    },
  },
  {
    index: 0,
    function: {
      arguments: " help",
    },
  },
  {
    index: 0,
    function: {
      arguments: " me",
    },
  },
  {
    index: 0,
    function: {
      arguments: '","',
    },
  },
  {
    index: 0,
    function: {
      arguments: "action",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "Provide",
    },
  },
  {
    index: 0,
    function: {
      arguments: " methods",
    },
  },
  {
    index: 0,
    function: {
      arguments: " to",
    },
  },
  {
    index: 0,
    function: {
      arguments: " calculate",
    },
  },
  {
    index: 0,
    function: {
      arguments: " age",
    },
  },
  {
    index: 0,
    function: {
      arguments: '"},{"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "label",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "No",
    },
  },
  {
    index: 0,
    function: {
      arguments: ",",
    },
  },
  {
    index: 0,
    function: {
      arguments: " thanks",
    },
  },
  {
    index: 0,
    function: {
      arguments: '","',
    },
  },
  {
    index: 0,
    function: {
      arguments: "action",
    },
  },
  {
    index: 0,
    function: {
      arguments: '":"',
    },
  },
  {
    index: 0,
    function: {
      arguments: "Close",
    },
  },
  {
    index: 0,
    function: {
      arguments: '"}',
    },
  },
  {
    index: 0,
    function: {
      arguments: "]}",
    },
  },
];

describe("combineChunks", () => {
  it("should combine tool calls into a single JSON object", () => {
    const result = combineChunks(chunks as any);
    const combinedToolCalls = [
      {
        index: 0,
        function: {
          name: "create_ui_component",
          arguments: JSON.stringify({
            title: "How Old Are You?",
            text: "Unfortunately, I can't determine your age from this interaction. Would you like help on how to find out your age?",
            buttons: [
              {
                label: "Yes, help me",
                action: "Provide methods to calculate age",
              },
              { label: "No, thanks", action: "Close" },
            ],
          }),
        },
      },
    ];
    expect(result).toEqual(combinedToolCalls);
  });
});
