#include <iostream>

int main()
{
    short a{ 30000 };
    int b{ a };
    long c{ b + 100000 };
    long long d{ c };

    std::cout << a << ' ' << b << ' ' << c << ' ' << d << '\n';
    return 0;
}
