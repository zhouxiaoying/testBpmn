// CustomContextPad.js
export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this); // 定义这是一个contextPad
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate
        } = this;
        function appendTask(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:Task' });
                autoPlace.append(element, shape);
            } else {
                appendTaskStart(event, element);
            }
        }

        function appendTaskStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:Task' });
            create.start(event, shape, element);
        }
        function appendUserTask(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
                autoPlace.append(element, shape);
            } else {
                appendUserTaskStart(event, element);
            }
        }

        function appendUserTaskStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
            create.start(event, shape, element);
        }
        if(element.type !== 'bpmn:SequenceFlow'){
            return {
                'append.lindaidai-task': {
                    group: 'model',
                    className: 'icon-custom lindaidai-task',
                    title: translate('创建一个类型为lindaidai-task的任务节点'),
                    action: {
                        click: appendTask,
                        dragstart: appendTaskStart
                    }
                },
                'append.chrome-task': {
                    group: 'model',
                    className: 'icon-custom chrome-task',
                    title: translate('创建一个类型为chrome-task的任务节点'),
                    action: {
                        click: appendUserTask,
                        dragstart: appendUserTaskStart
                    }
                }
            };
        }
        
    }
    }

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
];

