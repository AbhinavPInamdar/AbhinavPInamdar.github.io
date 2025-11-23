// Skill Network Graph
const skills = {
    nodes: [
        { id: 'go', label: 'Go', group: 1 },
        { id: 'python', label: 'Python', group: 1 },
        { id: 'typescript', label: 'TypeScript', group: 1 },
        { id: 'kubernetes', label: 'Kubernetes', group: 2 },
        { id: 'docker', label: 'Docker', group: 2 },
        { id: 'aws', label: 'AWS', group: 2 },
        { id: 'grpc', label: 'gRPC', group: 3 },
        { id: 'rest', label: 'REST', group: 3 },
        { id: 'postgres', label: 'PostgreSQL', group: 4 },
        { id: 'dynamodb', label: 'DynamoDB', group: 4 },
        { id: 'redis', label: 'Redis', group: 4 },
        { id: 'tensorflow', label: 'TensorFlow', group: 1 }
    ],
    links: [
        { source: 'go', target: 'grpc' },
        { source: 'go', target: 'kubernetes' },
        { source: 'go', target: 'docker' },
        { source: 'python', target: 'tensorflow' },
        { source: 'python', target: 'rest' },
        { source: 'typescript', target: 'rest' },
        { source: 'kubernetes', target: 'docker' },
        { source: 'kubernetes', target: 'aws' },
        { source: 'docker', target: 'aws' },
        { source: 'grpc', target: 'postgres' },
        { source: 'rest', target: 'dynamodb' },
        { source: 'aws', target: 'dynamodb' },
        { source: 'aws', target: 'redis' },
        { source: 'go', target: 'postgres' },
        { source: 'python', target: 'postgres' }
    ]
};

const colors = {
    1: '#00d9ff',
    2: '#4ecdc4',
    3: '#ff6b6b',
    4: '#95e1d3'
};

function drawNetwork() {
    const svg = document.getElementById('skillNetwork');
    const width = svg.clientWidth;
    const height = 500;
    
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Create force simulation
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Position nodes in a circular layout
    const angleStep = (2 * Math.PI) / skills.nodes.length;
    const radius = Math.min(width, height) * 0.35;
    
    skills.nodes.forEach((node, i) => {
        const angle = i * angleStep;
        node.x = centerX + radius * Math.cos(angle);
        node.y = centerY + radius * Math.sin(angle);
    });
    
    // Draw links
    skills.links.forEach(link => {
        const source = skills.nodes.find(n => n.id === link.source);
        const target = skills.nodes.find(n => n.id === link.target);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', source.x);
        line.setAttribute('y1', source.y);
        line.setAttribute('x2', target.x);
        line.setAttribute('y2', target.y);
        line.setAttribute('stroke', 'rgba(0, 217, 255, 0.2)');
        line.setAttribute('stroke-width', '1');
        line.classList.add('network-link');
        svg.appendChild(line);
    });
    
    // Draw nodes
    skills.nodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
        g.classList.add('network-node');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', colors[node.group]);
        circle.setAttribute('opacity', '0.8');
        circle.setAttribute('stroke', colors[node.group]);
        circle.setAttribute('stroke-width', '2');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dy', '0.35em');
        text.setAttribute('fill', '#000');
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', '700');
        text.textContent = node.label;
        
        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
        
        // Add hover effect
        g.addEventListener('mouseenter', () => {
            circle.setAttribute('r', '35');
            circle.setAttribute('opacity', '1');
            
            // Highlight connected links
            skills.links.forEach(link => {
                if (link.source === node.id || link.target === node.id) {
                    const lines = svg.querySelectorAll('.network-link');
                    lines.forEach(line => {
                        const source = skills.nodes.find(n => n.id === link.source);
                        const target = skills.nodes.find(n => n.id === link.target);
                        if (line.getAttribute('x1') == source.x && line.getAttribute('y1') == source.y &&
                            line.getAttribute('x2') == target.x && line.getAttribute('y2') == target.y) {
                            line.setAttribute('stroke', colors[node.group]);
                            line.setAttribute('stroke-width', '2');
                        }
                    });
                }
            });
        });
        
        g.addEventListener('mouseleave', () => {
            circle.setAttribute('r', '30');
            circle.setAttribute('opacity', '0.8');
            
            // Reset links
            const lines = svg.querySelectorAll('.network-link');
            lines.forEach(line => {
                line.setAttribute('stroke', 'rgba(0, 217, 255, 0.2)');
                line.setAttribute('stroke-width', '1');
            });
        });
    });
}

// Draw on load and resize
window.addEventListener('load', drawNetwork);
window.addEventListener('resize', drawNetwork);
