# Nitro API Routes

This directory contains Nitro server API routes for the Oracle frontend.

## Structure

```
server/api/v1/
├── bills.get.ts        # GET /api/v1/bills - List bills (paginated)
├── bills.post.ts       # POST /api/v1/bills - Create bill
├── bills/
│   ├── [id].put.ts     # PUT /api/v1/bills/[id] - Update bill
│   └── [id].delete.ts  # DELETE /api/v1/bills/[id] - Delete bill
```

## Endpoints

### Bills

#### GET /api/v1/bills
Fetch paginated list of bills.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 20)

**Response:**
```typescript
{
  bills: Bill[];
  total: number;
  page: number;
  pageSize: number;
}
```

#### POST /api/v1/bills
Create a new bill.

**Request Body:**
```typescript
{
  heading: string;
  amountTON: number;
  amountUSD?: number;
  icon?: string;
  dateLabel?: string;
  date?: string;
  type?: "active" | "paid";
}
```

**Response:**
```typescript
{
  success: true;
  bill: Bill;
}
```

#### PUT /api/v1/bills/[id]
Update an existing bill.

**URL Parameters:**
- `id`: Bill ID

**Request Body:** Same as POST

**Response:**
```typescript
{
  success: true;
  bill: Bill;
}
```

#### DELETE /api/v1/bills/[id]
Delete a bill.

**URL Parameters:**
- `id`: Bill ID

**Response:**
```typescript
{
  success: true;
  message: string;
  billId: number;
}
```

## Mock Data

Mock data is located in `shared/mocks/bills.mock.ts` and exports:

- `MOCK_BILLS`: Array of 12 sample bills
- `BillsDraftContract`: Type definition for API response
- `createBillsResponse(page, pageSize)`: Function to paginate mock data

## Integration with Store

The store (`store/bills/index.ts`) uses the `fetchBills()` action to call `/api/v1/bills`:

```typescript
const billsStore = useBillsStore();
await billsStore.fetchBills(page, pageSize);
```

## TODO

- [ ] Replace mock responses with real backend API calls
- [ ] Add error handling and validation
- [ ] Add authentication middleware
- [ ] Add rate limiting
- [ ] Implement proper error responses

