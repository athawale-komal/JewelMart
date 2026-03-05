import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, deleteProduct, createProduct, updateProduct } from "../../States/Products/Action";
import { Plus, Search, Edit2, Trash2, Filter, X, ImageIcon, Loader2, Gem, UploadCloud, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

// ─── Portal Select (dropdown renders at <body> level, escapes overflow clipping) ─
function CustomSelect({ name, value, onChange, options, placeholder }) {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const btnRef = useRef(null);
    const dropRef = useRef(null);

    const handleToggle = () => {
        if (!open && btnRef.current) {
            setRect(btnRef.current.getBoundingClientRect());
        }
        setOpen(o => !o);
    };

    // Recalculate position on scroll/resize
    useEffect(() => {
        if (!open) return;
        const update = () => { if (btnRef.current) setRect(btnRef.current.getBoundingClientRect()); };
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => { window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
    }, [open]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (btnRef.current?.contains(e.target) || dropRef.current?.contains(e.target)) return;
            setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const selected = options.find(o => o.value === value);

    return (
        <div className="relative">
            <button
                ref={btnRef}
                type="button"
                onClick={handleToggle}
                className={`w-full flex items-center justify-between bg-slate-50 border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${open ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
                <span className={value ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    {selected ? (
                        <span className="flex items-center gap-2">
                            {selected.dot && <span className={`w-2 h-2 rounded-full shrink-0 ${selected.dot}`} />}
                            {selected.label}
                        </span>
                    ) : placeholder}
                </span>
                <ChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && rect && ReactDOM.createPortal(
                <div
                    ref={dropRef}
                    style={{
                        position: "fixed",
                        top: rect.bottom + 4,
                        left: rect.left,
                        width: rect.width,
                        zIndex: 99999,
                    }}
                    className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                >
                    {options.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-slate-400 italic">No options available</div>
                    ) : options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => { onChange({ target: { name, value: opt.value } }); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${value === opt.value ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                            {opt.dot && <span className={`w-2 h-2 rounded-full shrink-0 ${opt.dot}`} />}
                            {opt.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}

// ─── Image Upload Zone ────────────────────────────────────────────────────────
function ImageUploadZone({ images, onChange, existingImages }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        const fileArr = Array.from(files).filter(f => f.type.startsWith("image/"));
        onChange(prev => [...prev, ...fileArr]);
    };

    const removeNew = (idx) => onChange(prev => prev.filter((_, i) => i !== idx));

    return (
        <div className="space-y-3">
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                onClick={() => inputRef.current.click()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-8 cursor-pointer transition-all duration-200 ${dragging ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/50'}`}
            >
                <UploadCloud size={28} className={`mb-2 transition-colors ${dragging ? 'text-emerald-500' : 'text-slate-300'}`} />
                <p className="text-sm font-semibold text-slate-600">Drop images here or <span className="text-emerald-600">browse</span></p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP supported</p>
                <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </div>

            {(images.length > 0 || existingImages?.length > 0) && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {existingImages?.map((url, i) => (
                        <div key={`ex-${i}`} className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square group">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[9px] text-white font-bold bg-black/50 px-2 py-0.5 rounded-full">Existing</span>
                            </div>
                        </div>
                    ))}
                    {images.map((file, i) => (
                        <div key={`new-${i}`} className="relative rounded-xl overflow-hidden border-2 border-emerald-300 aspect-square group">
                            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeNew(i)}
                                className="absolute top-1 right-1 w-5 h-5 bg-rose-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={10} />
                            </button>
                            <div className="absolute bottom-1 left-1 text-[9px] text-white font-bold bg-emerald-500 px-1.5 py-0.5 rounded-full">New</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const METAL_TYPES = [
    { value: "Gold", label: "Gold", dot: "bg-amber-400" },
    { value: "Silver", label: "Silver", dot: "bg-slate-400" },
    { value: "Platinum", label: "Platinum", dot: "bg-blue-300" },
    { value: "Diamond", label: "Diamond", dot: "bg-sky-300" },
];

const PURITY_OPTIONS = {
    Gold: ["24K", "22K", "18K", "14K", "10K"],
    Silver: ["999", "925", "900", "800"],
    Platinum: ["950", "900", "850"],
    Diamond: ["VS1", "VS2", "SI1", "SI2", "VVS1"],
};

const CATEGORIES = [
    { value: "rings", label: "Rings" },
    { value: "necklaces", label: "Necklaces" },
    { value: "earrings", label: "Earrings" },
    { value: "bangles", label: "Bangles" },
    { value: "bracelets", label: "Bracelets" },
    { value: "mangalsutra", label: "Mangalsutra" },
    { value: "anklets", label: "Anklets" },
    { value: "nose-pins", label: "Nose Pin" },
    { value: "pendants", label: "Pendants" },
    { value: "chains", label: "Chains" },
    { value: "toe-rings", label: "Toe Ring" },
    { value: "kada", label: "Kada" },
];

const BLANK_FORM = {
    title: "", brand: "", category: "", metalType: "", purity: "",
    description: "", price: "", discountedPrice: "", stock: "", tag: ""
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminProducts() {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState(BLANK_FORM);
    const [newImages, setNewImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.product);

    useEffect(() => { dispatch(findProducts()); }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === "metalType" ? { purity: "" } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingProduct && newImages.length === 0) {
            toast.error("Please upload at least one product image.");
            return;
        }
        setSubmitting(true);
        const fd = new FormData();
        Object.entries(formData).forEach(([k, v]) => { if (v !== "") fd.append(k, v); });
        newImages.forEach(file => fd.append("images", file));

        try {
            if (editingProduct) {
                await dispatch(updateProduct(editingProduct._id, fd));
                toast.success("Product updated successfully!");
            } else {
                await dispatch(createProduct(fd));
                toast.success("Product listed successfully!");
            }
            // Always re-fetch the full product list after any mutation
            await dispatch(findProducts({}));
            closeModal();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
            toast.success("Product deleted");
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title || "", brand: product.brand || "",
            category: product.category || "", metalType: product.metalType || "",
            purity: product.purity || "", description: product.description || "",
            price: product.price || "", discountedPrice: product.discountedPrice || "",
            stock: product.stock || "", tag: product.tag || ""
        });
        setNewImages([]);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData(BLANK_FORM);
        setNewImages([]);
    };

    const filteredProducts = products?.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.metalType?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400";
    const labelClass = "text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2 px-0.5";

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 mb-0.5">Product Inventory</h1>
                    <p className="text-slate-500 text-sm">Manage your jewelry collections and stock.</p>
                </div>
                <button
                    onClick={() => { setShowModal(true); setEditingProduct(null); }}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-200 active:scale-95"
                >
                    <Plus size={18} /> Add New Jewelry
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, category, metal..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-all font-medium">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-3.5">Product</th>
                                <th className="px-6 py-3.5">Metal</th>
                                <th className="px-6 py-3.5 text-center">Price</th>
                                <th className="px-6 py-3.5 text-center">Stock</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" /></td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan="5" className="py-20 text-center text-sm text-slate-400">No products found.</td></tr>
                            ) : filteredProducts.map((p) => (
                                <tr key={p._id} className="hover:bg-slate-50/60 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                                <img src={p.images?.[0] || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">{p.title}</p>
                                                <p className="text-xs text-slate-400">{p.brand} · {p.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit">
                                                {p.metalType}
                                            </span>
                                            {p.purity && <span className="text-[10px] text-slate-400">{p.purity}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-bold text-slate-800">₹{p.discountedPrice?.toLocaleString()}</span>
                                            <span className="text-slate-400 text-[10px] line-through">₹{p.price?.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-sm font-bold ${p.stock < 10 ? 'text-rose-500' : 'text-slate-600'}`}>
                                            {p.stock} <span className="text-slate-400 font-normal text-xs">units</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEditModal(p)} className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-all border border-slate-200 hover:border-emerald-200" title="Edit">
                                                <Edit2 size={15} />
                                            </button>
                                            <button onClick={() => handleDelete(p._id)} className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all border border-slate-200 hover:border-rose-200" title="Delete">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Product Modal ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white border border-slate-200 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10 sm:rounded-t-3xl rounded-t-3xl">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">{editingProduct ? "Update Jewelry" : "List New Jewelry"}</h2>
                                <p className="text-slate-400 text-xs mt-0.5">{editingProduct ? "Make changes and save." : "New product will be live immediately."}</p>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Basic Details */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-100">
                                        <Plus size={12} /> Basic Info
                                    </h3>
                                    <div>
                                        <label className={labelClass}>Product Title *</label>
                                        <input name="title" value={formData.title} onChange={handleInputChange} className={inputClass} placeholder="e.g. Diamond Solitaire Ring" required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Brand *</label>
                                        <input name="brand" value={formData.brand} onChange={handleInputChange} className={inputClass} placeholder="JewelMart" required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Category *</label>
                                        <CustomSelect name="category" value={formData.category} onChange={handleInputChange} options={CATEGORIES} placeholder="Select category" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Tag</label>
                                        <input name="tag" value={formData.tag} onChange={handleInputChange} className={inputClass} placeholder="e.g. Best Seller" />
                                    </div>
                                </div>

                                {/* Material */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-100">
                                        <Gem size={12} /> Materials
                                    </h3>
                                    <div>
                                        <label className={labelClass}>Metal Type *</label>
                                        <CustomSelect name="metalType" value={formData.metalType} onChange={handleInputChange} options={METAL_TYPES} placeholder="Select metal" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Purity</label>
                                        <CustomSelect
                                            name="purity"
                                            value={formData.purity}
                                            onChange={handleInputChange}
                                            options={(PURITY_OPTIONS[formData.metalType] || []).map(p => ({ value: p, label: p }))}
                                            placeholder={formData.metalType ? "Select purity" : "Choose metal first"}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Stock *</label>
                                        <input name="stock" type="number" min="0" value={formData.stock} onChange={handleInputChange} className={inputClass} placeholder="0" required />
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-100">
                                        ₹ Pricing
                                    </h3>
                                    <div>
                                        <label className={labelClass}>Market Price (₹) *</label>
                                        <input name="price" type="number" min="0" value={formData.price} onChange={handleInputChange} className={inputClass} placeholder="0" required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Offer / Sale Price (₹)</label>
                                        <input name="discountedPrice" type="number" min="0" value={formData.discountedPrice} onChange={handleInputChange} className={inputClass} placeholder="Leave blank for no discount" />
                                    </div>
                                    {formData.price && formData.discountedPrice && Number(formData.price) > 0 && (
                                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                                            <p className="text-xs font-bold text-emerald-700">
                                                Discount: {Math.round(((Number(formData.price) - Number(formData.discountedPrice)) / Number(formData.price)) * 100)}% off
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className={labelClass}>Description *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className={inputClass + " h-28 resize-none"} placeholder="Describe the craftsmanship, materials, and occasion..." required />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <div className="flex items-center gap-1.5 pb-2 mb-3 border-b border-slate-100">
                                    <ImageIcon size={12} className="text-emerald-600" />
                                    <h3 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                        Product Images {!editingProduct && <span className="text-rose-400">*</span>}
                                    </h3>
                                    {editingProduct && <span className="text-[9px] text-slate-400 ml-1">(Upload new images to replace existing)</span>}
                                </div>
                                <ImageUploadZone
                                    images={newImages}
                                    onChange={setNewImages}
                                    existingImages={editingProduct ? editingProduct.images : []}
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-2 border-t border-slate-100 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold rounded-xl shadow-sm shadow-emerald-200 transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2"
                                >
                                    {submitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : (editingProduct ? "Save Changes" : "Confirm Listing")}
                                </button>
                                <button type="button" onClick={closeModal} className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
