// Configuration - UPDATE THESE VALUES
const CONFIG = {
    // Your Google Sheets API key (get from Google Cloud Console)
    API_KEY: 'YOUR_GOOGLE_SHEETS_API_KEY_HERE',
    // Your Google Sheet ID (from the URL)
    SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',
    // Sheet name (tab name in your Google Sheet)
    SHEET_NAME: 'Sheet1',
    // Range that contains your data (adjust if needed)
    SHEET_RANGE: 'A1:N1000'
};

// Global variables
let componentsData = [];
let currentEditingIndex = -1;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
async function initializeApp() {
    showLoading(true);
    try {
        await loadComponentsFromSheet();
        renderComponents();
        showLoading(false);
    } catch (error) {
        console.error('Error initializing app:', error);
        showMessage('Error loading components. Please check your API configuration.', 'error');
        showLoading(false);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Header buttons
    document.getElementById('refreshBtn').addEventListener('click', async () => {
        showLoading(true);
        await loadComponentsFromSheet();
        renderComponents();
        showLoading(false);
        showMessage('Components refreshed successfully!', 'success');
    });

    document.getElementById('addComponentBtn').addEventListener('click', () => {
        openModal();
    });

    // Filter inputs
    document.getElementById('categoryFilter').addEventListener('change', renderComponents);
    document.getElementById('statusFilter').addEventListener('change', renderComponents);
    document.getElementById('searchInput').addEventListener('input', renderComponents);

    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('componentForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('deleteBtn').addEventListener('click', handleDelete);

    // Close modal when clicking outside
    document.getElementById('componentModal').addEventListener('click', (e) => {
        if (e.target.id === 'componentModal') {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('componentModal').style.display !== 'none') {
            closeModal();
        }
    });
}

// Load components from Google Sheets
async function loadComponentsFromSheet() {
    if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_GOOGLE_SHEETS_API_KEY_HERE') {
        throw new Error('Google Sheets API key not configured');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}!${CONFIG.SHEET_RANGE}?key=${CONFIG.API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length < 2) {
        componentsData = [];
        return;
    }

    // Convert sheet data to objects
    const headers = data.values[0];
    componentsData = data.values.slice(1).map(row => {
        const component = {};
        headers.forEach((header, index) => {
            component[header] = row[index] || '';
        });
        return component;
    }).filter(component => component['Component Name']); // Filter out empty rows
}

// Save component to Google Sheets
async function saveComponentToSheet(component, isNew = false) {
    if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_GOOGLE_SHEETS_API_KEY_HERE') {
        throw new Error('Google Sheets API key not configured');
    }

    // Add timestamp
    component['Last Updated'] = new Date().toISOString().split('T')[0];
    
    if (isNew) {
        // Add new row
        const values = [
            component['Component Name'] || '',
            component['Figma Node ID'] || '',
            component['Category'] || '',
            component['Status'] || 'Draft',
            component['Usage Guidelines'] || '',
            component['Content Guidelines'] || '',
            component['Voice & Tone'] || '',
            component['Do\'s'] || '',
            component['Don\'ts'] || '',
            component['Content Examples'] || '',
            component['Character Limits'] || '',
            component['Accessibility Notes'] || '',
            component['Last Updated'] || '',
            component['Updated By'] || ''
        ];

        const range = `${CONFIG.SHEET_NAME}!A${componentsData.length + 2}:N${componentsData.length + 2}`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${range}?valueInputOption=RAW&key=${CONFIG.API_KEY}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [values]
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to save: ${response.status}`);
        }

        componentsData.push(component);
    } else {
        // Update existing row
        const rowIndex = currentEditingIndex + 2; // +2 for header row and 1-based indexing
        const values = [
            component['Component Name'] || '',
            component['Figma Node ID'] || '',
            component['Category'] || '',
            component['Status'] || 'Draft',
            component['Usage Guidelines'] || '',
            component['Content Guidelines'] || '',
            component['Voice & Tone'] || '',
            component['Do\'s'] || '',
            component['Don\'ts'] || '',
            component['Content Examples'] || '',
            component['Character Limits'] || '',
            component['Accessibility Notes'] || '',
            component['Last Updated'] || '',
            component['Updated By'] || ''
        ];

        const range = `${CONFIG.SHEET_NAME}!A${rowIndex}:N${rowIndex}`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${range}?valueInputOption=RAW&key=${CONFIG.API_KEY}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [values]
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to update: ${response.status}`);
        }

        componentsData[currentEditingIndex] = component;
    }
}

// Delete component from Google Sheets
async function deleteComponentFromSheet(index) {
    if (!CONFIG.API_KEY || CONFIG.API_KEY === 'YOUR_GOOGLE_SHEETS_API_KEY_HERE') {
        throw new Error('Google Sheets API key not configured');
    }

    // Clear the row (Google Sheets API doesn't support row deletion easily)
    const rowIndex = index + 2; // +2 for header row and 1-based indexing
    const range = `${CONFIG.SHEET_NAME}!A${rowIndex}:N${rowIndex}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${range}:clear?key=${CONFIG.API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
    }

    componentsData.splice(index, 1);
}

// Render components grid
function renderComponents() {
    const grid = document.getElementById('componentsGrid');
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Filter components
    let filteredComponents = componentsData.filter(component => {
        const matchesCategory = !categoryFilter || component.Category === categoryFilter;
        const matchesStatus = !statusFilter || component.Status === statusFilter;
        const matchesSearch = !searchTerm || 
            component['Component Name'].toLowerCase().includes(searchTerm) ||
            component['Usage Guidelines'].toLowerCase().includes(searchTerm) ||
            component['Content Guidelines'].toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesStatus && matchesSearch;
    });

    if (filteredComponents.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No components found</h3>
                <p>Try adjusting your filters or add a new component.</p>
                <button class="btn btn-primary" onclick="openModal()">
                    <i class="fas fa-plus"></i> Add Component
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredComponents.map((component, index) => {
        const originalIndex = componentsData.indexOf(component);
        return createComponentCard(component, originalIndex);
    }).join('');
}

// Create component card HTML
function createComponentCard(component, index) {
    const statusClass = component.Status ? component.Status.toLowerCase() : 'draft';
    const usagePreview = truncateText(component['Usage Guidelines'] || 'No usage guidelines provided', 120);
    const contentPreview = truncateText(component['Content Guidelines'] || 'No content guidelines provided', 120);
    
    return `
        <div class="component-card" onclick="editComponent(${index})">
            <div class="component-card-header">
                <h3 class="component-name">${component['Component Name'] || 'Unnamed Component'}</h3>
                <div class="component-meta">
                    <span class="status-badge ${statusClass}">${component.Status || 'Draft'}</span>
                    <span class="category-badge">${component.Category || 'Uncategorized'}</span>
                </div>
            </div>
            <div class="component-content">
                <div class="content-section">
                    <div class="content-label">Usage Guidelines</div>
                    <div class="content-text">${usagePreview}</div>
                </div>
                <div class="content-section">
                    <div class="content-label">Content Guidelines</div>
                    <div class="content-text">${contentPreview}</div>
                </div>
                ${component['Content Examples'] ? `
                    <div class="content-section">
                        <div class="content-label">Examples</div>
                        <div class="content-text content-examples">${truncateText(component['Content Examples'], 100)}</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Open modal for editing/creating component
function openModal(index = -1) {
    currentEditingIndex = index;
    const modal = document.getElementById('componentModal');
    const title = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deleteBtn');
    
    if (index >= 0) {
        // Edit mode
        title.textContent = 'Edit Component';
        deleteBtn.style.display = 'block';
        populateForm(componentsData[index]);
    } else {
        // Create mode
        title.textContent = 'Add New Component';
        deleteBtn.style.display = 'none';
        clearForm();
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('componentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    clearForm();
}

// Populate form with component data
function populateForm(component) {
    document.getElementById('componentName').value = component['Component Name'] || '';
    document.getElementById('figmaNodeId').value = component['Figma Node ID'] || '';
    document.getElementById('category').value = component['Category'] || '';
    document.getElementById('status').value = component['Status'] || 'Draft';
    document.getElementById('usageGuidelines').value = component['Usage Guidelines'] || '';
    document.getElementById('contentGuidelines').value = component['Content Guidelines'] || '';
    document.getElementById('voiceTone').value = component['Voice & Tone'] || '';
    document.getElementById('dos').value = component['Do\'s'] || '';
    document.getElementById('donts').value = component['Don\'ts'] || '';
    document.getElementById('contentExamples').value = component['Content Examples'] || '';
    document.getElementById('characterLimits').value = component['Character Limits'] || '';
    document.getElementById('accessibilityNotes').value = component['Accessibility Notes'] || '';
    document.getElementById('updatedBy').value = component['Updated By'] || '';
}

// Clear form
function clearForm() {
    document.getElementById('componentForm').reset();
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const component = {
        'Component Name': document.getElementById('componentName').value,
        'Figma Node ID': document.getElementById('figmaNodeId').value,
        'Category': document.getElementById('category').value,
        'Status': document.getElementById('status').value,
        'Usage Guidelines': document.getElementById('usageGuidelines').value,
        'Content Guidelines': document.getElementById('contentGuidelines').value,
        'Voice & Tone': document.getElementById('voiceTone').value,
        'Do\'s': document.getElementById('dos').value,
        'Don\'ts': document.getElementById('donts').value,
        'Content Examples': document.getElementById('contentExamples').value,
        'Character Limits': document.getElementById('characterLimits').value,
        'Accessibility Notes': document.getElementById('accessibilityNotes').value,
        'Updated By': document.getElementById('updatedBy').value
    };

    try {
        const isNew = currentEditingIndex === -1;
        await saveComponentToSheet(component, isNew);
        closeModal();
        renderComponents();
        showMessage(isNew ? 'Component created successfully!' : 'Component updated successfully!', 'success');
    } catch (error) {
        console.error('Error saving component:', error);
        showMessage('Error saving component. Please try again.', 'error');
    }
}

// Handle delete
async function handleDelete() {
    if (currentEditingIndex === -1) return;
    
    if (!confirm('Are you sure you want to delete this component? This action cannot be undone.')) {
        return;
    }

    try {
        await deleteComponentFromSheet(currentEditingIndex);
        closeModal();
        renderComponents();
        showMessage('Component deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting component:', error);
        showMessage('Error deleting component. Please try again.', 'error');
    }
}

// Edit component (called from card click)
function editComponent(index) {
    openModal(index);
}

// Show loading state
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    const mainContent = document.getElementById('mainContent');
    
    if (show) {
        loadingState.style.display = 'flex';
        mainContent.style.display = 'none';
    } else {
        loadingState.style.display = 'none';
        mainContent.style.display = 'block';
    }
}

// Show message
function showMessage(text, type = 'success') {
    const container = document.getElementById('messageContainer');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    container.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}