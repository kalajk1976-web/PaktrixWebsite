import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import { Mail, Phone, Building, MessageSquare, Trash2, Eye, EyeOff } from 'lucide-react';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  request_type: string;
  status: string;
  created_at: string;
}

export default function AdminContactRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('contact_requests')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (!error) {
      loadRequests();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      const { error } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);

      if (!error) {
        loadRequests();
      }
    }
  };

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(req => req.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'contact': 'General Contact',
      'partner': 'Partnership',
      'quote': 'Quote Request',
      'support': 'Support',
    };
    return labels[type] || type;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Contact Requests</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
            >
              <option value="all">All ({requests.length})</option>
              <option value="new">New ({requests.filter(r => r.status === 'new').length})</option>
              <option value="in_progress">In Progress ({requests.filter(r => r.status === 'in_progress').length})</option>
              <option value="resolved">Resolved ({requests.filter(r => r.status === 'resolved').length})</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No contact requests found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getRequestTypeLabel(request.request_type)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${request.email}`} className="hover:text-brand-green">
                          {request.email}
                        </a>
                      </div>
                      {request.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${request.phone}`} className="hover:text-brand-green">
                            {request.phone}
                          </a>
                        </div>
                      )}
                      {request.company && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>{request.company}</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        Received: {new Date(request.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title={expandedId === request.id ? 'Hide message' : 'Show message'}
                    >
                      {expandedId === request.id ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete request"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {expandedId === request.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{request.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Status:</span>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
