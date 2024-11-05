export function combineChunks(chunks: any[]): any[] {
  const groupedChunks = new Map<number, any>();
  for (const chunk of chunks) {
    const idx = chunk.index;

    
    if (!groupedChunks.has(idx)) {
      groupedChunks.set(idx, {
        index: idx,
        function: {
          name: "",
          arguments: "",
        },
      });
    }

    const group = groupedChunks.get(idx);

    
    if (chunk.type === "function" && chunk.function.name) {
      group.function.name = chunk.function.name;
    }

    
    if (chunk.function && chunk.function.arguments) {
      group.function.arguments += chunk.function.arguments;
    }
  }

  
  return Array.from(groupedChunks.values());
}
