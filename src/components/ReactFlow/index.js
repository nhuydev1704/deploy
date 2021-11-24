import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactFlow, {
    addEdge,
    removeElements,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
} from 'react-flow-renderer';
import axios from 'axios';
import { API_URL } from '../../apis/fetchData';

const elements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Case chatbot' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
    {
        id: '4',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 260 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-3', source: '3', target: '4' },
];

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const ReactFlowChatBot = ({ loadding, setDataQuestion, callback, setLoading }) => {
    const [dataElements, setDataElements] = useState([]);

    const getDataElement = async () => {
        setLoading(true);
        setDataElements([]);
        let dataElm = [];
        let dataSource = [];

        const res = await axios.get(`${API_URL}/api/chatbot`);
        if (res.status === 200) {
            res.data.forEach((item) => {
                dataSource.push({ id: item.id, text: item.data.label });
                dataElm.push({ id: uid(), source: item.id_source, target: item.id_target, animated: true });
            });

            const finishData = [...res.data, ...dataElm];
            console.log('🚀 ~ file: index.js ~ line 61 ~ getDataElement ~ finishData', finishData);

            setDataElements(finishData);
            setDataQuestion(dataSource);
        }
        setLoading(false);
    };
    useEffect(() => {
        try {
            getDataElement();
        } catch (err) {
            console.log(err);
        }
    }, [callback]);

    // const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onConnect = (params) => console.log(params);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    async function onNodeDragStop(event, node) {
        console.log('🚀 ~ file: index.js ~ line 82 ~ onNodeDragStop ~ node', node);
        const position = {
            ...node.position,
        };
        console.log('🚀 ~ file: index.js ~ line 85 ~ onNodeDragStop ~ position', position);

        await axios.put(`${API_URL}/api/chatbot_position/${node.id}`, { position });
        // const res = await ApiComponents.update(urlChatBotCaseDetail, node.id, data);
    }

    const onNodeDoubleClick = (event, element) => {
        console.log('🚀 ~ file: index.js ~ line 90 ~ onNodeDoubleClick ~ element', element);
        // setCheckEditOne(!checkEditOne);
        // setIdCaseForm(get(element, 'id', ''));
        // setOpenModalEditChatBotCase(true);
    };

    const onLoad = (reactFlowInstance) => {
        reactFlowInstance.fitView();
    };

    return (
        <div style={{ height: '69vh' }}>
            {dataElements && dataElements.length > 0 && (
                <ReactFlowProvider>
                    <ReactFlow
                        onConnect={onConnect}
                        onLoad={onLoad}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onNodeDragStop={onNodeDragStop}
                        elements={dataElements}
                    >
                        <MiniMap
                            nodeColor={(node) => {
                                switch (node.type) {
                                    case 'output':
                                        return 'red';
                                    case 'default':
                                        return '#00ff00';
                                    case 'input':
                                        return 'rgb(0,0,255)';
                                    default:
                                        return '#eee';
                                }
                            }}
                            nodeBorderRadius={2}
                            nodeStrokeWidth={3}
                        />
                        <Background variant="lines" gap={40} size={1} />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            )}
        </div>
    );
};

export default ReactFlowChatBot;
