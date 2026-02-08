#include <iostream>

int bump(int x)
{
    std::cout << '[' << x << ']';
    return x + 1;
}

int main()
{
    int a{ bump(1) };

    bump(a);

    std::cout << '=' << a << '\n';
    return 0;
}
