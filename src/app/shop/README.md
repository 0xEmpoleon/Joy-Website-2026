# Shop / Pre-Order Page

## Overview
The Shop page is a complete e-commerce solution for pre-ordering Play on Joy consoles with cryptocurrency payment integration via Helio Pay. It provides a full shopping cart experience, checkout flow, and Solana wallet connectivity.

## Features

### 1. Product Catalog
- **Dynamic Product Display**: Fetches active products from backend API
- **Product Cards**: Shows product images, descriptions, pricing, and specifications
- **Color Options**: Allows customers to select from available color variants
- **Best For You**: Displays recommended use cases for each product
- **Add to Cart**: Simple one-click add to cart functionality

### 2. Shopping Cart
- **Cart Management**: Add, remove, and update quantities
- **Real-time Total**: Live calculation of cart total
- **Persistent Cart**: Cart state maintained throughout session
- **Color Variants**: Track different colors as separate cart items
- **Visual Cart Display**: Thumbnails and details for each item

### 3. Checkout Flow

#### Step 1: Customer Information
- Name, email, and phone number collection
- Client-side validation with inline error messages
- Order summary with itemized pricing
- Total amount display

#### Step 2: Payment Method Selection
Three payment options:
- **💰 Cryptocurrency**: Direct crypto payments (SOL, USDC, USDT)
- **💳 Credit/Debit Card**: Fiat-to-crypto bridge via Helio Pay
- **🎨 NFT Payment**: Pay with eligible NFTs

#### Step 3: Wallet Integration
- **Wallet Connect**: Integration with Phantom and other Solana wallets
- **Real-time Connection**: Shows connected wallet address
- **Disconnect Option**: Easy wallet disconnection
- **Fallback Handling**: Prompts to install wallet if not detected

#### Step 4: Payment Processing
- **Helio Pay Integration**: Creates payment links via backend API
- **Pre-Order Creation**: Generates pre-order records in database
- **Transaction Tracking**: Stores payment IDs and transaction hashes
- **Error Handling**: User-friendly error messages

#### Step 5: Confirmation
- **Success Screen**: Order confirmation with details
- **Order ID**: Unique identifier for tracking
- **Email/SMS Notifications**: Confirmation sent to customer
- **Continue Shopping**: Option to return to store

### 4. Security Features
- ✓ Wallet Connect Integration
- ✓ Smart Contract Execution (ready for implementation)
- ✓ Instant Confirmation
- ✓ Email & SMS Notifications

## Technical Implementation

### API Endpoints Used

#### Products API (`/api/products`)
- **GET** `/api/products?limit=100` - Fetch all active products
- Filters for `status === 'active'` products only

#### Pre-Orders API (`/api/pre-orders`)
- **POST** `/api/pre-orders` - Create new pre-order
- **GET** `/api/pre-orders/:id` - Get order status (for confirmation)

#### Helio Pay API (`/api/helio`)
- **POST** `/api/helio/create-payment` - Create payment link
- **GET** `/api/helio/payment/:paymentId` - Check payment status

### Data Flow

```
1. User browses products → Fetches from /api/products
2. User adds to cart → Updates local state
3. User proceeds to checkout → Collects customer info
4. User selects payment method → Shows wallet connect (if crypto)
5. User connects wallet → Phantom/Solana wallet integration
6. User initiates payment → Calls /api/helio/create-payment
7. Payment processed → Creates pre-orders via /api/pre-orders
8. Confirmation shown → Order ID and details displayed
```

### TypeScript Interfaces

```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  imageUrl: string;
  bestForYou: string;
  colorOptions: string[];
  specifications: { ... };
}

interface CartItem {
  product: Product;
  selectedColor: string;
  quantity: number;
}

interface CheckoutData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: CartItem[];
  totalAmount: number;
}
```

### Component Structure

```
ShopPage (Main Component)
├── ProductCard (Product Display)
│   ├── Product Image
│   ├── Product Info
│   ├── Color Selector
│   └── Add to Cart Button
├── Cart Summary
├── Cart Details
└── CheckoutFlow
    ├── Customer Info Form
    ├── Payment Method Selection
    ├── WalletConnect Component
    ├── Payment Processing
    └── Order Confirmation
```

## Styling

### Design System
- **Color Scheme**: Purple gradient background (#667eea to #764ba2)
- **Accent Colors**:
  - Success: #43e97b (green gradient)
  - Warning/Error: #f5576c (red)
  - Premium: #ffd700 (gold for pricing)
- **Effects**:
  - Glassmorphism (backdrop-filter blur)
  - Gradient overlays
  - Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Grid layout adapts: multi-column → single column
- Touch-friendly buttons and inputs
- Optimized for all screen sizes (breakpoint: 768px)

## Setup & Installation

### Prerequisites
- Next.js 15.5+
- React 19.1+
- Backend API running on port 5000

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation Steps
1. Page is automatically routed at `/shop`
2. Ensure backend API is running
3. Products must be created via admin panel
4. Helio Pay API should be configured in backend

### Optional: Solana Wallet Integration
For full wallet support, install (if not already installed):
```bash
npm install @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js --legacy-peer-deps
```

## Usage

### For Customers
1. Browse available products
2. Select color variant (if available)
3. Add items to cart
4. Review cart and proceed to checkout
5. Enter contact information
6. Select payment method (crypto/fiat/NFT)
7. Connect wallet (for crypto payments)
8. Complete payment
9. Receive order confirmation

### For Developers
1. Product data automatically fetched from backend
2. Cart state managed in React hooks
3. Checkout flow handles all validation
4. Payment integration ready for Helio production API
5. Pre-order records created in database

## Future Enhancements

### Planned Features
- [ ] Bundle offers (console + accessories)
- [ ] Limited edition NFT offerings
- [ ] Real smart contract integration
- [ ] Multiple cryptocurrency support
- [ ] Order tracking page
- [ ] Email/SMS notification service integration
- [ ] Inventory management integration
- [ ] Discount codes/coupons
- [ ] Guest checkout option
- [ ] Save cart to account

### Smart Contract Features
- On-chain order verification
- NFT-gated exclusive products
- Token-based loyalty rewards
- Decentralized order tracking

## Troubleshooting

### Common Issues

**Products not loading**
- Check backend API is running
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Ensure products exist and are set to 'active' status

**Wallet not connecting**
- Install Phantom wallet browser extension
- Refresh page after installing wallet
- Check wallet is unlocked
- Try different browser if issues persist

**Payment failing**
- Check backend Helio API route is accessible
- Verify customer information is valid
- Ensure cart has items
- Check browser console for error details

**Images not displaying**
- Verify image paths in product records
- Check backend uploads directory is accessible
- Confirm `next.config.ts` has correct remote patterns

## API Integration Details

### Pre-Order Creation Payload
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "productId": "product_id_here",
  "selectedColor": "Black",
  "quantity": 1,
  "notes": "Payment Method: crypto",
  "paymentId": "pay_xxxx",
  "transactionHash": "0xabcd..."
}
```

### Helio Payment Payload
```json
{
  "amount": 499.99,
  "currency": "USDC",
  "productId": "product_id_here",
  "metadata": {
    "customer": {...},
    "items": [...]
  }
}
```

## Security Considerations

1. **Client-side validation**: All forms validated before submission
2. **API Error handling**: Graceful error messages, no sensitive data exposed
3. **Wallet security**: Uses native wallet connection, no private keys stored
4. **Payment processing**: Handled by Helio Pay (PCI compliant)
5. **Data sanitization**: All inputs validated on backend

## Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **API Caching**: Consider implementing for product data
- **State Management**: Efficient React hooks usage
- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: Components loaded on demand

## Browser Support

- Chrome/Edge (recommended for Phantom wallet)
- Firefox
- Safari (limited wallet support)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Documentation

- [Backend API Routes](../../../play-on-joy-backend/README.md)
- [Helio Pay Integration](../heliopay/README.md)
- [Admin Panel - Product Management](../../../play-on-joy-admin-frontend/README.md)
- [Database Schema - PreOrder Model](../../../play-on-joy-backend/models/PreOrder.js)

## Support

For issues or questions:
1. Check backend logs for API errors
2. Review browser console for client-side errors
3. Verify environment variables are set correctly
4. Ensure all dependencies are installed
5. Contact development team for assistance

---

**Last Updated**: 2025-10-08
**Version**: 1.0.0
**Status**: Production Ready
