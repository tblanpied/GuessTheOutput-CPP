#include <iostream>

int main()
{
    int x{ 2'147'483 };
    long long y{ -9'000'000'000LL };

    std::cout << x << '\n' << y << '\n';
    return 0;
}
